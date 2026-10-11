# -*- coding: utf-8 -*-
"""
鐵人賽文章與圖片數據萃取工具
從 RSS feed 中解析所有 28 篇（含番外）文章、所有圖片 URL、說明文字（Caption），
並關聯至本地 AI 圖，為 GitHub Pages 網頁產生結構化 ironman_data.json。
"""

import xml.etree.ElementTree as ET
import re
import json
import os
import sys

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")

RSS_FILE = r"C:\Users\Anubis.Chan\.gemini\antigravity-ide\brain\440bf893-6f5a-4893-a42d-32c59e06cd4e\.system_generated\steps\126\content.md"
TARGET_DIR = r"C:\Users\Anubis.Chan\Downloads\鐵人賽\實驗場所\鐵人賽網頁"
OUTPUT_JSON = os.path.join(TARGET_DIR, "ironman_data.json")

def clean_caption(caption: str) -> str:
    """清理圖說，移除 Midjourney 示意圖字樣及多餘標點"""
    cap = re.sub(r'[*_~`#]', '', caption)
    # 移除 (Midjourney 示意圖) / （Midjourney 示意圖） / midjourney示意圖 / Midjourney概念示意圖 等
    cap = re.sub(r'[\(（]\s*midjourney\s*.*?[\)）]', '', cap, flags=re.IGNORECASE)
    cap = re.sub(r'midjourney\s*示意圖', '', cap, flags=re.IGNORECASE)
    cap = re.sub(r'midjourney\s*概念示意圖', '', cap, flags=re.IGNORECASE)
    cap = re.sub(r'midjourney', '', cap, flags=re.IGNORECASE)
    # 清理多餘空白及符號
    cap = re.sub(r'▲\s*', '', cap)
    cap = cap.strip(' ：:，,⋯…-–—')
    return cap.strip()

def run_extraction():
    print("正在讀取 RSS 來源資料...")
    with open(RSS_FILE, "r", encoding="utf-8") as f:
        text = f.read()

    xml_start = text.find("<?xml")
    xml_text = text[xml_start:] if xml_start != -1 else text

    root = ET.fromstring(xml_text)
    channel = root.find("channel")
    items = channel.findall("item")

    articles = []

    # 本地 AI 圖檔名對應表 (Day 1 ~ Day 28)
    ai_img_map = {
        1: "day1.png", 2: "day 2.png", 3: "day 3.png", 4: "day 4.png", 5: "day5.png",
        6: "day 6.png", 7: "day7.png", 8: "day 8.png", 9: "day 9.png", 10: "day 10.png",
        11: "day11.png", 12: "day 12.png", 13: "day13.png", 14: "day14.png", 15: "day15.png",
        16: "day 16.png", 17: "day 17.png", 18: "day 18.png", 19: "day 19.png", 20: "day 20.png",
        21: "day 21.png", 22: "day 22.png", 23: "day 23.png", 24: "day 24.png", 25: "day 25.png",
        26: "day26.png", 27: "day 27.png", 28: "day 28.png"
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
            "days": [25, 26, 27, 28],
            "desc": "建立 GitHub Pages 戰略發布首頁、賽博時空簽證護照計時器，深入辯證人機犯錯光譜——到底錯的是我，還是這個世界？唯有溝通能達成共識。"
        }
    }

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

        # 提取文章中所有的圖片區塊
        # 尋找 <p><img ...><br /><em>...</em></p> 或獨立 <img> 與 <em/figcaption>
        # 使用正規表達式匹配 img 標籤與後續的圖說
        img_pattern = re.compile(r'<img[^>]+src=[\'"]([^\'"]+)[\'"][^>]*(?:alt=[\'"]([^\'"]*)[\'"])?[^>]*>', re.IGNORECASE)
        
        # 尋找所有 <img> 及其周圍的 <em> 圖說
        # 尋找片段切片
        image_entries = []
        
        # 用正則切分找尋 <img ...> 及其鄰近的 <em>
        splits = re.split(r'(<img[^>]+>)', html)
        curr_img_src = None
        curr_img_alt = None

        for part in splits:
            img_m = img_pattern.match(part.strip())
            if img_m:
                curr_img_src = img_m.group(1)
                curr_img_alt = img_m.group(2) or ""
            elif curr_img_src:
                # 在後續文字找 <em>...</em> 或圖說文字
                em_m = re.search(r'<em>(.*?)</em>', part, re.DOTALL | re.IGNORECASE)
                raw_caption = em_m.group(1).strip() if em_m else curr_img_alt
                
                # 清洗圖說
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

        # 若沒抓到但有 img，用簡易模式抓
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
        ai_concept_img = None
        if image_entries:
            ai_concept_img = image_entries[0]

        # 匹配本地 AI 圖檔
        local_ai_filename = ai_img_map.get(day_num, None)
        local_ai_path = f"assets/ai-images/{local_ai_filename}" if local_ai_filename else None

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

    # 按照 Day 排序 (Day 1 到 Day 28)
    articles.sort(key=lambda x: (x["day"] if x["day"] is not None else 999, 1 if x["is_extra"] else 0))

    final_payload = {
        "series_title": "學生身份如何每天透過Vibe Coding每天做跨領域的創新項目",
        "series_url": "https://ithelp.ithome.com.tw/2026ironman/signup/user/20184140",
        "rss_url": "https://ithelp.ithome.com.tw/rss/series/9607",
        "total_days": 28,
        "total_articles": len(articles),
        "case_arcs": case_arcs,
        "articles": articles
    }

    with open(OUTPUT_JSON, "w", encoding="utf-8") as f:
        json.dump(final_payload, f, ensure_ascii=False, indent=2)

    print(f"成功萃取 {len(articles)} 篇圖文數據至 {OUTPUT_JSON}！")
    print(f"包含 28 天 AI 線索圖與全部 {sum(len(a['all_images']) for a in articles)} 張文章配圖。")

if __name__ == "__main__":
    run_extraction()
