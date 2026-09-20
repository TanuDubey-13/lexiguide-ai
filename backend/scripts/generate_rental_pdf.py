"""Generate the sample Residential_Rental_Agreement.pdf document using PyMuPDF."""
import os
import pymupdf as fitz


def generate_rental_pdf(output_paths: list[str]):
    doc = fitz.open()

    # Document contents by section matching mockData.ts
    sections = [
        {
            "num": "Section 1",
            "title": "Parties and Leased Premises",
            "paras": [
                'This Residential Rental Agreement ("Agreement") is executed on this 1st day of October, 2026, by and between Landlord Properties LLC, having its principal address at Suite 400, Metro Tower, Downtown ("Landlord"), and Jane Doe ("Tenant").',
                'The Landlord agrees to lease to the Tenant, and the Tenant hereby agrees to take on lease, the residential premises situated at Unit 4B, 108 Greenview Residency, Park Road ("Premises"), for residential dwelling purposes only and for no other commercial or manufacturing purposes.'
            ]
        },
        {
            "num": "Section 2",
            "title": "Term of Tenancy and Renewal Terms",
            "paras": [
                'The term of this tenancy shall commence on November 1, 2026, and shall continue for a fixed period of eleven (11) consecutive calendar months, expiring on September 30, 2027.',
                'Renewal Terms: Upon mutual written agreement of both parties delivered at least sixty (60) days prior to the expiration date, this Agreement may be renewed for an additional eleven (11) month tenure. Renewal may include an annual escalation of the monthly rent not exceeding five percent (5%) to seven percent (7%). Neither party shall be automatically bound to renewal without written endorsement.'
            ]
        },
        {
            "num": "Section 3",
            "title": "Rent and Payment Schedule",
            "paras": [
                'The monthly rent for the Premises shall be Rs. 24,000 (Rupees Twenty Four Thousand only), payable strictly in advance on or before the fifth (5th) calendar day of each operating month via bank electronic funds transfer.',
                'In the event that rent remains unpaid after the tenth (10th) day of the month, a recurring late fee of Rs. 500 per week shall automatically accrue until full liquidation of the arrears.'
            ]
        },
        {
            "num": "Section 4",
            "title": "Security Deposit and Deductions",
            "paras": [
                'Upon execution of this Agreement, the Tenant shall deposit with the Landlord an interest-free refundable Security Deposit of Rs. 50,000 (Rupees Fifty Thousand only) as guarantee for the faithful performance of all covenants and obligations.',
                'The Security Deposit shall be returned to the Tenant within thirty (30) business days following full handover of the Premises, keys, and proof of utility clearance, subject to reasonable itemized deductions for documented physical damages exceeding normal wear and tear, unpaid rent, or utility arrears.'
            ]
        },
        {
            "num": "Section 5",
            "title": "Maintenance Responsibilities and Repairs",
            "paras": [
                'The Tenant covenants to maintain the interior of the Premises in a sanitary, tidy, and habitable condition throughout the term.',
                'Minor repairs up to Rs. 1,500 per occurrence resulting from daily wear and routine usage (including light bulbs, faucet washers, and minor fixture tightening) shall be borne by the Tenant. Major structural repairs, primary plumbing failures, roofing integrity, and electrical circuitry faults shall be the Landlord\'s responsibility, provided Tenant gives written notification within forty-eight (48) hours of discovery.'
            ]
        },
        {
            "num": "Section 6",
            "title": "Alterations and Additions",
            "paras": [
                'The Tenant shall make no structural alterations, wall perforations, paint modifications, or electrical overhauls without the prior express written consent of the Landlord. Any unauthorized alterations shall be restored to initial condition at Tenant\'s sole expense prior to vacation.'
            ]
        },
        {
            "num": "Section 7",
            "title": "Termination and Notice Period",
            "paras": [
                'Either party may terminate this agreement by providing thirty (30) days advance written notice delivered via registered post or certified electronic mail.',
                'Lock-in Condition: Should the Tenant vacate or terminate the lease prior to the expiration of the initial six (6) month lock-in period without documented cause or landlord breach, the Security Deposit equivalent to one month rent shall be forfeited as liquidated damages to compensate for vacancy costs.'
            ]
        },
        {
            "num": "Section 8",
            "title": "Inspection and Entry Rights",
            "paras": [
                'The Landlord or authorized agents retain the right to enter the Premises during reasonable daylight hours (9:00 AM to 7:00 PM) for inspection, emergency maintenance, or displaying the unit to prospective tenants or purchasers, upon tendering at least twenty-four (24) hours prior written notice to the Tenant, except in cases of imminent emergency (fire, water leakage) where immediate entry is permitted.'
            ]
        },
        {
            "num": "Section 9",
            "title": "Subletting and Assignment",
            "paras": [
                'The Tenant shall not assign, sublease, license, or transfer possession of the Premises or any part thereof to any third party, nor host long-term paying guests, without obtaining prior written approval from the Landlord.'
            ]
        },
        {
            "num": "Section 10",
            "title": "Quiet Enjoyment and Community Rules",
            "paras": [
                'The Tenant shall be entitled to quiet and peaceful enjoyment of the Premises without unlawful interference by the Landlord. The Tenant agrees to comply with all building bylaws, noise ordinances after 10:00 PM, and waste disposal regulations established by the Resident Welfare Association.'
            ]
        },
        {
            "num": "Section 11",
            "title": "Indemnification and Limitation of Liability",
            "paras": [
                'The Tenant agrees to indemnify, defend, and hold harmless the Landlord from and against any and all claims, liabilities, damages, and legal costs arising from tenant negligence, guest conduct, or violation of applicable laws within the leased premises.',
                'The Landlord shall not be liable for any injury, loss, or theft of personal property belonging to Tenant or occupants, except where directly caused by the gross negligence or intentional misconduct of the Landlord.'
            ]
        },
        {
            "num": "Section 12",
            "title": "Governing Law and Dispute Resolution",
            "paras": [
                'This Agreement shall be governed by and construed in accordance with the jurisdictional laws of the territory. Any dispute, controversy, or claim arising out of or relating to this Agreement shall first be submitted to mutual amicable mediation for twenty (20) days before either party may seek recourse through the competent civil courts.'
            ]
        }
    ]

    page_width, page_height = fitz.paper_size("a4")
    margin_left = 54
    margin_right = page_width - 54
    margin_top = 54
    margin_bottom = page_height - 50
    usable_width = margin_right - margin_left

    # Group sections across 4 pages
    pages_sections = [
        sections[0:3],   # Sections 1, 2, 3 (Page 1)
        sections[3:6],   # Sections 4, 5, 6 (Page 2)
        sections[6:9],   # Sections 7, 8, 9 (Page 3)
        sections[9:12],  # Sections 10, 11, 12 + Signatures (Page 4)
    ]

    total_pages = len(pages_sections)

    for page_idx, page_content in enumerate(pages_sections):
        page = doc.new_page(width=page_width, height=page_height)
        y_cursor = margin_top

        # Top Running Header Bar
        page.draw_rect(fitz.Rect(margin_left, y_cursor, margin_right, y_cursor + 20), color=(0.85, 0.88, 0.92), fill=(0.96, 0.97, 0.99), width=0.5)
        page.insert_text(
            (margin_left + 8, y_cursor + 14),
            "LEXIGUIDE AI DEMO INSTRUMENT  |  RESIDENTIAL RENTAL AGREEMENT",
            fontsize=8,
            color=(0.10, 0.20, 0.35)
        )
        page.insert_text(
            (margin_right - 140, y_cursor + 14),
            "FICTIONAL DEMO DOCUMENT",
            fontsize=8,
            color=(0.70, 0.20, 0.20)
        )
        y_cursor += 32

        # Document Title on Page 1
        if page_idx == 0:
            page.insert_text(
                (margin_left, y_cursor + 18),
                "RESIDENTIAL RENTAL AGREEMENT",
                fontsize=16,
                color=(0.06, 0.16, 0.26)
            )
            y_cursor += 28

            # Notice Box
            sub_rect = fitz.Rect(margin_left, y_cursor, margin_right, y_cursor + 24)
            page.draw_rect(sub_rect, color=(0.77, 0.60, 0.23), fill=(0.99, 0.98, 0.94), width=0.75)
            page.insert_text(
                (margin_left + 10, y_cursor + 16),
                "NOTICE: This is a fictional document prepared solely for demonstration, testing, and educational purposes.",
                fontsize=8.5,
                color=(0.45, 0.35, 0.10)
            )
            y_cursor += 36

        # Render sections for this page
        for sec in page_content:
            sec_heading = f"{sec['num']}: {sec['title']}"
            page.insert_text(
                (margin_left, y_cursor + 12),
                sec_heading,
                fontsize=11.5,
                color=(0.06, 0.16, 0.26)
            )
            page.draw_line(
                (margin_left, y_cursor + 16),
                (margin_right, y_cursor + 16),
                color=(0.85, 0.88, 0.92),
                width=0.75
            )
            y_cursor += 24

            # Paragraphs
            for p in sec["paras"]:
                max_box_h = 160
                text_rect = fitz.Rect(margin_left + 4, y_cursor, margin_right - 4, y_cursor + max_box_h)
                unused = page.insert_textbox(
                    text_rect,
                    p,
                    fontsize=9.5,
                    color=(0.15, 0.18, 0.22)
                )
                if unused >= 0:
                    used_h = max_box_h - unused
                else:
                    used_h = 40
                y_cursor += used_h + 8

            y_cursor += 8

        # Execution and signature blocks on the last page
        if page_idx == total_pages - 1:
            y_cursor += 10
            page.insert_text(
                (margin_left, y_cursor + 12),
                "IN WITNESS WHEREOF, the Landlord and Tenant have executed this Agreement on the date first stated above.",
                fontsize=9.5,
                color=(0.20, 0.20, 0.20)
            )
            y_cursor += 30

            box_width = (usable_width - 24) / 2

            # Landlord Box
            l_box = fitz.Rect(margin_left, y_cursor, margin_left + box_width, y_cursor + 85)
            page.draw_rect(l_box, color=(0.80, 0.84, 0.88), fill=(0.98, 0.99, 1.0), width=0.75)
            page.insert_text((margin_left + 12, y_cursor + 20), "LANDLORD:", fontsize=9, color=(0.10, 0.20, 0.35))
            page.insert_text((margin_left + 12, y_cursor + 40), "Signature: _______________________", fontsize=8.5, color=(0.3, 0.3, 0.3))
            page.insert_text((margin_left + 12, y_cursor + 58), "Name: Landlord Properties LLC", fontsize=8, color=(0.3, 0.3, 0.3))
            page.insert_text((margin_left + 12, y_cursor + 72), "Date: October 1, 2026", fontsize=8, color=(0.3, 0.3, 0.3))

            # Tenant Box
            r_box = fitz.Rect(margin_left + box_width + 24, y_cursor, margin_right, y_cursor + 85)
            page.draw_rect(r_box, color=(0.80, 0.84, 0.88), fill=(0.98, 0.99, 1.0), width=0.75)
            page.insert_text((margin_left + box_width + 36, y_cursor + 20), "TENANT:", fontsize=9, color=(0.10, 0.20, 0.35))
            page.insert_text((margin_left + box_width + 36, y_cursor + 40), "Signature: _______________________", fontsize=8.5, color=(0.3, 0.3, 0.3))
            page.insert_text((margin_left + box_width + 36, y_cursor + 58), "Name: Jane Doe", fontsize=8, color=(0.3, 0.3, 0.3))
            page.insert_text((margin_left + box_width + 36, y_cursor + 72), "Date: October 1, 2026", fontsize=8, color=(0.3, 0.3, 0.3))

        # Bottom Running Footer
        page.draw_line(
            (margin_left, margin_bottom),
            (margin_right, margin_bottom),
            color=(0.85, 0.88, 0.92),
            width=0.75
        )
        page.insert_text(
            (margin_left, margin_bottom + 14),
            "LexiGuide AI  *  Grounded Document Assistance  *  Not formal legal advice",
            fontsize=8,
            color=(0.50, 0.55, 0.62)
        )
        page.insert_text(
            (margin_right - 65, margin_bottom + 14),
            f"Page {page_idx + 1} of {total_pages}",
            fontsize=8,
            color=(0.35, 0.40, 0.48)
        )

    # Save to all target paths
    for out_path in output_paths:
        abs_p = os.path.abspath(out_path)
        os.makedirs(os.path.dirname(abs_p), exist_ok=True)
        doc.save(abs_p)
        print(f"Successfully generated: {abs_p} ({os.path.getsize(abs_p)} bytes)")

    doc.close()


if __name__ == "__main__":
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    root_dir = os.path.dirname(base_dir)

    destinations = [
        os.path.join(root_dir, "Residential_Rental_Agreement.pdf"),
        os.path.join(root_dir, "public", "Residential_Rental_Agreement.pdf"),
        os.path.join(base_dir, "sample_documents", "Residential_Rental_Agreement.pdf")
    ]
    generate_rental_pdf(destinations)
