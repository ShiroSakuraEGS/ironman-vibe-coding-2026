# -*- coding: utf-8 -*-
"""
鐵人賽文章與圖片數據萃取工具 (升級版)
功能：
1. 自動連線至 iThome 官方 RSS Feed (https://ithelp.ithome.com.tw/rss/series/9607) 抓取最新文章。
2. 同時儲存/更新本地快取 series_rss.xml。
3. 解析全系列文章、圖片 URL、說明文字 (Caption)，並自動清洗非必要字樣。
4. 輸出結構化 ironman_data.json，並自動同步產出免 CORS 的 data.js。
"""

import xml.etree.ElementTree as ET
import re
import json
import os
import sys
import requests

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")

RSS_URL = "https://ithelp.ithome.com.tw/rss/series/9607"
TARGET_DIR = os.path.dirname(os.path.abspath(__file__))
CACHE_XML = os.path.join(TARGET_DIR, "series_rss.xml")
OUTPUT_JSON = os.path.join(TARGET_DIR, "ironman_data.json")
OUTPUT_JS = os.path.join(TARGET_DIR, "data.js")

def clean_caption(caption: str) -> str:
    """清理圖說，移除 Midjourney 示意圖字樣及多餘標點"""
    cap = re.sub(r'[*_~`#]', '', caption)
    cap = re.sub(r'[\(（]\s*midjourney\s*.*?[\)）]', '', cap, flags=re.IGNORECASE)
    cap = re.sub(r'midjourney\s*示意圖', '', cap, flags=re.IGNORECASE)
    cap = re.sub(r'midjourney\s*概念示意圖', '', cap, flags=re.IGNORECASE)
    cap = re.sub(r'midjourney', '', cap, flags=re.IGNORECASE)
    cap = re.sub(r'▲\s*', '', cap)
    cap = cap.strip(' ：:，,⋯…-–—')
    return cap.strip()

def fetch_rss_content() -> str:
    """取得 RSS XML 內容：優先從線上抓取，失敗時讀取本地快取"""
    print(f"正在從 iThome 官方 RSS 連線抓取最新文章...")
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36"
    }
    try:
        resp = requests.get(RSS_URL, headers=headers, timeout=20)
        resp.encoding = "utf-8"
        if resp.status_code == 200 and "<rss" in resp.text:
            print("✅ 成功取得線上最新 RSS Feed！")
            with open(CACHE_XML, "w", encoding="utf-8") as f:
                f.write(resp.text)
            return resp.text
        else:
            print(f"⚠️ 線上請求返回狀態碼 {resp.status_code}，嘗試讀取本地快取...")
    except Exception as e:
        print(f"⚠️ 連線線上 RSS 失敗: {e}，嘗試使用本地快取...")

    if os.path.exists(CACHE_XML):
        with open(CACHE_XML, "r", encoding="utf-8") as f:
            print("📁 讀取本地快取 series_rss.xml 成功。")
            return f.read()

    raise RuntimeError("無法取得 RSS 資料（線上請求與本地快取皆不可用）！")

def run_extraction():
    raw_xml = fetch_rss_content()

    xml_start = raw_xml.find("<?xml")
    xml_text = raw_xml[xml_start:] if xml_start != -1 else raw_xml

    root = ET.fromstring(xml_text)
    channel = root.find("channel")
    items = channel.findall("item")

    articles = []

    # 本地 AI 圖檔名對應表 (Day 1 ~ Day 30)
    ai_img_map = {
        1: "day1.png", 2: "day 2.png", 3: "day 3.png", 4: "day 4.png", 5: "day5.png",
        6: "day 6.png", 7: "day7.png", 8: "day 8.png", 9: "day 9.png", 10: "day 10.png",
        11: "day11.png", 12: "day 12.png", 13: "day13.png", 14: "day14.png", 15: "day15.png",
        16: "day 16.png", 17: "day 17.png", 18: "day 18.png", 19: "day 19.png", 20: "day 20.png",
        21: "day 21.png", 22: "day 22.png", 23: "day 23.png", 24: "day 24.png", 25: "day 25.png",
        26: "day26.png", 27: "day 27.png", 28: "day 28.png", 29: "day 29.png", 30: "day 30.png"
    }

    # 故事化案件卷宗分類 (Case Arcs)
    case_arcs = {
        "arc_1": {
            "id": "CASE-ARC-01",
            "name": "檔案卷宗 I：初心破壁與多重身份",
            "codename": "GENESIS & IDENTITY",
            "days": [1, 2, 3, 4, 5],
            "desc": "中文系出身踏入科技管理，從跨領域日常自我介紹、光劍競賽規則查驗，到動手搓出 AI 虛擬伴侶與 ASMR 影音精華自動化剪輯系統。"
        },
        "arc_2": {
            "id": "CASE-ARC-02",
            "name": "檔案卷宗 II：實體穿透與賽博桌面",
            "codename": "CYBER-PHYSICAL SYNAPSE",
            "days": [6, 7, 8, 9],
            "desc": "突破純軟體視窗枷鎖，創造陪伴系 Chrome 網頁桌寵、串接 micro:bit 與實體硬體信使，探索人機共生與文科靈魂的實體降臨。"
        },
        "arc_3": {
            "id": "CASE-ARC-03",
            "name": "檔案卷宗 III：高維向量與文學宇宙",
            "codename": "HIGH-DIMENSIONAL RETRIEVAL",
            "days": [10, 11, 12, 13, 14],
            "desc": "走進政大 Colab 課堂探索 RAG 原理，將個人文學創作降維映射為 487 顆發光星點的三維文學宇宙，見證數學空間與文字的浪漫交會。"
        },
        "arc_4": {
            "id": "CASE-ARC-04",
            "name": "檔案卷宗 IV：智財法規與多模態創作",
            "codename": "POLICY, IP & FREQUENCY",
            "days": [15, 16, 17, 18, 19],
            "desc": "科智所核心研究能量展現！歐盟 3D 商標審查智慧可視化、AI 工具政策諮詢智庫、結合 Suno 音樂多模態即時創作原型。"
        },
        "arc_5": {
            "id": "CASE-ARC-05",
            "name": "檔案卷宗 V：心智模型與自動化工廠",
            "codename": "AUTOMATION & PSYCHE",
            "days": [20, 21, 22, 23, 24],
            "desc": "建構全自動 RSS 文章排版工廠、心理諮商 AI 評估矩陣、系統一與系統二直覺辨證實驗，以及賽博龐克維修艙互動裝置。"
        },
        "arc_6": {
            "id": "CASE-ARC-06",
            "name": "檔案卷宗 VI：終極共識與時間哲學",
            "codename": "TIME MATRIX & ULTIMATE ALIGNMENT",
            "days": [25, 26, 27, 28, 29, 30],
            "desc": "建立 GitHub Pages 戰略發布首頁、賽博時空簽證護照計時器，深入辯證人機犯錯光譜——到底錯的是我，還是這個世界？唯有溝通能達成共識。"
        }
    }

    img_pattern = re.compile(r'<img[^>]+src=[\'"]([^\'"]+)[\'"][^>]*(?:alt=[\'"]([^\'"]*)[\'"])?[^>]*>', re.IGNORECASE)

    for item in items:
        title = item.find("title").text or ""
        link = item.find("link").text or ""
        pub_date = item.find("pubDate").text if item.find("pubDate") is not None else ""
        encoded = item.find("{http://purl.org/rss/1.0/modules/content/}encoded")
        html = encoded.text if encoded is not None else ""

        # 匹配 Day 編號
        day_match = re.search(r'Day\s*(\d+)', title, re.IGNORECASE)
        day_num = int(day_match.group(1)) if day_match else None

        is_extra = "外傳" in title or "番外" in title

        # 清洗文章標題
        clean_title = re.sub(r'^(【?Day\s*\d+】?|Day\s*\d+)\s*[-:：]?\s*', '', title, flags=re.IGNORECASE).strip()
        if not clean_title:
            clean_title = title

        # 提取文章中所有的圖片與圖說
        image_entries = []
        splits = re.split(r'(<img[^>]+>)', html)
        curr_img_src = None
        curr_img_alt = None

        for part in splits:
            img_m = img_pattern.match(part.strip())
            if img_m:
                curr_img_src = img_m.group(1)
                curr_img_alt = img_m.group(2) or ""
            elif curr_img_src:
                em_m = re.search(r'<em>(.*?)</em>', part, re.DOTALL | re.IGNORECASE)
                raw_caption = em_m.group(1).strip() if em_m else curr_img_alt
                caption = clean_caption(raw_caption)
                if not caption or len(caption) < 2:
                    caption = clean_caption(curr_img_alt)
                if not caption:
                    caption = f"文章重要展示配圖"

                image_entries.append({
                    "src": curr_img_src,
                    "alt": curr_img_alt,
                    "caption": caption,
                    "raw_caption": raw_caption
                })
                curr_img_src = None
                curr_img_alt = None

        if not image_entries:
            for match in img_pattern.finditer(html):
                src = match.group(1)
                alt = match.group(2) or ""
                image_entries.append({
                    "src": src,
                    "alt": alt,
                    "caption": clean_caption(alt) or "系列專案成果展示",
                    "raw_caption": alt
                })

        # 找出本篇的第一張 AI 概念圖
        ai_concept_img = image_entries[0] if image_entries else None

        # 匹配本地 AI 圖檔（若本地檔案存在則關聯）
        local_ai_filename = ai_img_map.get(day_num, None)
        local_ai_path = None
        if local_ai_filename:
            candidate_path = os.path.join(TARGET_DIR, "assets", "ai-images", local_ai_filename)
            if os.path.exists(candidate_path):
                local_ai_path = f"assets/ai-images/{local_ai_filename}"

        # 歸屬卷宗
        assigned_arc = None
        for arc_k, arc_v in case_arcs.items():
            if day_num in arc_v["days"]:
                assigned_arc = {
                    "arc_id": arc_v["id"],
                    "arc_name": arc_v["name"],
                    "arc_code": arc_v["codename"]
                }
                break

        articles.append({
            "day": day_num,
            "is_extra": is_extra,
            "title": clean_title,
            "full_title": title,
            "link": link,
            "pub_date": pub_date,
            "arc": assigned_arc,
            "ai_image": {
                "local_file": local_ai_path,
                "online_url": ai_concept_img["src"] if ai_concept_img else "",
                "caption": ai_concept_img["caption"] if ai_concept_img else f"Day {day_num} 概念示意圖",
                "clue_summary": f"【線索 #{day_num:02d}】" + (ai_concept_img["caption"] if ai_concept_img else clean_title)
            } if day_num else None,
            "all_images": image_entries,
            "images_count": len(image_entries)
        })

    # 按照 Day 排序 (Day 1 到 Day XX)
    articles.sort(key=lambda x: (x["day"] if x["day"] is not None else 999, 1 if x["is_extra"] else 0))

    final_payload = {
        "series_title": "學生身份如何每天透過Vibe Coding每天做跨領域的創新項目",
        "series_url": "https://ithelp.ithome.com.tw/2026ironman/signup/user/20184140",
        "rss_url": RSS_URL,
        "total_days": max((a["day"] for a in articles if a["day"] is not None), default=28),
        "total_articles": len(articles),
        "case_arcs": case_arcs,
        "articles": articles
    }

    # 1. 寫入 ironman_data.json
    with open(OUTPUT_JSON, "w", encoding="utf-8") as f:
        json.dump(final_payload, f, ensure_ascii=False, indent=2)

    # 2. 同步產出 data.js (免除 CORS 限制)
    json_str = json.dumps(final_payload, ensure_ascii=False, indent=2)
    with open(OUTPUT_JS, "w", encoding="utf-8") as f:
        f.write(f"// 鐵人賽系列圖文數據庫 (Series 9607) - 自動由 RSS 萃取生成\nwindow.IRONMAN_DATA = {json_str};\n")

    total_imgs = sum(len(a["all_images"]) for a in articles)
    print("==================================================")
    print(f"🎉 RSS 更新完成！")
    print(f"📊 總收錄文章數：{len(articles)} 篇")
    print(f"🖼️ 總收錄展示配圖：{total_imgs} 張")
    print(f"💾 已更新：{OUTPUT_JSON}")
    print(f"🌐 已更新：{OUTPUT_JS}")
    print("==================================================")

if __name__ == "__main__":
    run_extraction()
