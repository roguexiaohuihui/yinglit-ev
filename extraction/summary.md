# Catalog Extraction Summary

## Source
- **File**: Yinglit EV Charger 2026.pdf
- **Pages**: 30
- **Extracted**: 2026-03-09

## Statistics
- Product spec pages: 15
- SKUs detected: 42
- Spec tables extracted: 11
- Product images extracted: 0

## Page Index

| Page | Type | SKUs | Files |
|------|------|------|-------|
| 1 | cover | — | — |
| 2 | company_intro | — | — |
| 3 | certification | — | — |
| 4 | general_content | — | — |
| 5 | general_content | — | — |
| 6 | general_content | — | — |
| 7 | general_content | YLEV11K-Y2, YLEV22K-Y3 | — |
| 8 | product_spec | — | — |
| 9 | cloud_platform | — | — |
| 10 | product_spec | YLEV035K-P035, YLEV11K-P11 | — |
| 11 | product_spec | YLEV11K-Y2, YLEV22K-Y3 | — |
| 12 | product_spec | YLEV11K-S2, YLEV22K-S3 | — |
| 13 | product_spec | YLEV32A-L1, YLEV40A-L2, YLEV48A-L3 | 1 table(s) |
| 14 | product_spec | YLEV32A-S1, YLEV40A-S2, YLEV48A-S3 | 1 table(s) |
| 15 | product_spec | YLEV11K-P2, YLEV22K-P3 | 1 table(s) |
| 16 | product_spec | YLEV14K-T1, YLEV22K-T2, YLEV44K-T3 | 1 table(s) |
| 17 | product_spec | YLEV14K-T1, YLEV22K-T2, YLEV44K-T3 | 1 table(s) |
| 18 | product_spec | YLEV14K-AD1, YLEV22K-AD2, YLEV44K-AD3 | 1 table(s) |
| 19 | product_spec | YLEV30K-D1, YLEV40K-D2, YLEV60K-D3, YLEV60K-D4 | 1 table(s) |
| 20 | product_spec | YLEV30K-M2, YLEV40K-M4 | 1 table(s) |
| 21 | product_spec | YLEV120K-D5, YLEV60K-D4 | 1 table(s) |
| 22 | product_spec | YLEV120K-D5, YLEV150K-D6, YLEV180K-D7, YLEV240K-D8 | 1 table(s) |
| 23 | product_spec | YLEV300K-D10, YLEV300K-D9 | 1 table(s) |
| 24 | certification | YLEV60K-D7 | — |
| 25 | certification | — | — |
| 26 | certification | YLEV480K-D11, YLEV600K-D12, YLEV720K-D13 | — |
| 27 | general_content | YLEV250K-D14, YLIBS215-B14, YLIES480-K14 | — |
| 28 | certification | YLEN10K-E1, YLEN15K-E1, YLEN20K-E1 | — |
| 29 | cloud_platform | — | — |
| 30 | image_only | — | — |

## SKU Index

| # | SKU | Found on Page |
|---|-----|---------------|
| 1 | YLEV11K-Y2 | 7, 11 |
| 2 | YLEV22K-Y3 | 7, 11 |
| 3 | YLEV035K-P035 | 10 |
| 4 | YLEV11K-P11 | 10 |
| 5 | YLEV11K-S2 | 12 |
| 6 | YLEV22K-S3 | 12 |
| 7 | YLEV32A-L1 | 13 |
| 8 | YLEV40A-L2 | 13 |
| 9 | YLEV48A-L3 | 13 |
| 10 | YLEV32A-S1 | 14 |
| 11 | YLEV40A-S2 | 14 |
| 12 | YLEV48A-S3 | 14 |
| 13 | YLEV11K-P2 | 15 |
| 14 | YLEV22K-P3 | 15 |
| 15 | YLEV14K-T1 | 16, 17 |
| 16 | YLEV22K-T2 | 16, 17 |
| 17 | YLEV44K-T3 | 16, 17 |
| 18 | YLEV14K-AD1 | 18 |
| 19 | YLEV22K-AD2 | 18 |
| 20 | YLEV44K-AD3 | 18 |
| 21 | YLEV30K-D1 | 19 |
| 22 | YLEV40K-D2 | 19 |
| 23 | YLEV60K-D3 | 19 |
| 24 | YLEV60K-D4 | 19, 21 |
| 25 | YLEV30K-M2 | 20 |
| 26 | YLEV40K-M4 | 20 |
| 27 | YLEV120K-D5 | 21, 22 |
| 28 | YLEV150K-D6 | 22 |
| 29 | YLEV180K-D7 | 22 |
| 30 | YLEV240K-D8 | 22 |
| 31 | YLEV300K-D10 | 23 |
| 32 | YLEV300K-D9 | 23 |
| 33 | YLEV60K-D7 | 24 |
| 34 | YLEV480K-D11 | 26 |
| 35 | YLEV600K-D12 | 26 |
| 36 | YLEV720K-D13 | 26 |
| 37 | YLEV250K-D14 | 27 |
| 38 | YLIBS215-B14 | 27 |
| 39 | YLIES480-K14 | 27 |
| 40 | YLEN10K-E1 | 28 |
| 41 | YLEN15K-E1 | 28 |
| 42 | YLEN20K-E1 | 28 |

## How to Use This Extraction

### For the Agent building products.json:

1. **Read this file** to understand the catalog structure
2. **Read `manifest.json`** for the complete page metadata
3. **For each product page**: read `text/page_XX.md` for full specs
4. **Cross-reference with** `tables/page_XX_table_XX.md` for structured spec data
5. **Product images** are in `products/` — reference in products.json
6. **Page renders** are in `images/` — for visual reference if needed

### Completeness Check:

- Total SKUs detected: **42**
- Verify this count matches the number of products in your final products.json
- If counts don't match, check each product_spec page's text file for missed variants
- Pay special attention to spec tables with multiple model columns (variants sharing one page)

### Token Efficiency:

- Don't read the original PDF — use these extracted files instead
- Start with this summary, then drill into specific pages as needed
- Table files contain the most structured data — prioritize reading those