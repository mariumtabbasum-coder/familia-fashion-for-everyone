const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const { searchImage } = require('./fetch_catalog.cjs');

const MEN_CATALOG_DEF = [
  // ===================== SHIRTS (20) =====================
  {
    category: 'Shirts',
    dir: 'shirts',
    items: [
      {
        id: 'm-sh-01',
        name: "Classic Washed French Linen Long-Sleeve Shirt",
        color: { name: 'Sky Blue', hex: '#A8C9E8' },
        altColors: [{ name: 'Crisp White', hex: '#FFFFFF' }, { name: 'Sage Green', hex: '#87A892' }],
        price: 45, originalPrice: 58, discount: 22, isSale: true, isBest: true, isNew: false,
        query: 'man wearing light blue linen shirt studio model menswear'
      },
      {
        id: 'm-sh-02',
        name: 'Tailored Basketweave Oxford Button-Down Shirt',
        color: { name: 'Optic White', hex: '#FAF9F6' },
        altColors: [{ name: 'Light Blue', hex: '#D6E6F2' }, { name: 'Pink Tint', hex: '#F9E4E4' }],
        price: 48, originalPrice: 60, discount: 20, isSale: false, isBest: true, isNew: false,
        query: 'man wearing white oxford button down dress shirt studio model menswear'
      },
      {
        id: 'm-sh-03',
        name: 'Breezy Camp Collar Resort Short-Sleeve Shirt',
        color: { name: 'Sage Botanical', hex: '#77997A' },
        altColors: [{ name: 'Sand Cream', hex: '#E8DED1' }, { name: 'Navy Print', hex: '#1B263B' }],
        price: 38, originalPrice: 48, discount: 21, isSale: true, isBest: false, isNew: true,
        query: 'man wearing camp collar short sleeve resort shirt studio model menswear'
      },
      {
        id: 'm-sh-04',
        name: 'Fine Striped Cotton Poplin Business Dress Shirt',
        color: { name: 'Blue & White Stripe', hex: '#82A7CA' },
        altColors: [{ name: 'Navy Stripe', hex: '#1C2E4A' }, { name: 'Grey Stripe', hex: '#9E9EA0' }],
        price: 52, originalPrice: 65, discount: 20, isSale: false, isBest: true, isNew: false,
        query: 'man wearing striped cotton poplin dress shirt studio model menswear'
      },
      {
        id: 'm-sh-05',
        name: 'Heavyweight Cotton Flannel Plaid Overshirt',
        color: { name: 'Forest Green & Navy Plaid', hex: '#2A4638' },
        altColors: [{ name: 'Red & Black Buffalo', hex: '#8B1E1E' }, { name: 'Oatmeal Plaid', hex: '#D5C4A1' }],
        price: 58, originalPrice: 75, discount: 23, isSale: true, isBest: true, isNew: false,
        query: 'man wearing flannel plaid overshirt shirt jacket studio model menswear'
      },
      {
        id: 'm-sh-06',
        name: 'Minimalist Band Collar Linen Grandad Shirt',
        color: { name: 'Natural Sand', hex: '#D6C6B2' },
        altColors: [{ name: 'Pure White', hex: '#FFFFFF' }, { name: 'Olive Khaki', hex: '#58694F' }],
        price: 42, originalPrice: 52, discount: 19, isSale: false, isBest: false, isNew: true,
        query: 'man wearing mandarin band collar linen grandad shirt studio model menswear'
      },
      {
        id: 'm-sh-07',
        name: 'Western Denim Snap-Button Long-Sleeve Shirt',
        color: { name: 'Mid Stonewash Indigo', hex: '#4A6A8C' },
        altColors: [{ name: 'Dark Raw Denim', hex: '#1A2942' }, { name: 'Washed Black', hex: '#2B2D31' }],
        price: 55, originalPrice: 70, discount: 21, isSale: true, isBest: false, isNew: false,
        query: 'man wearing western denim shirt pearl snap studio model menswear'
      },
      {
        id: 'm-sh-08',
        name: 'Crisp Herringbone Twill Formal Dress Shirt',
        color: { name: 'Pale Pink Tint', hex: '#F6E3E3' },
        altColors: [{ name: 'White', hex: '#FFFFFF' }, { name: 'Sky Blue', hex: '#CCE2F0' }],
        price: 54, originalPrice: 68, discount: 21, isSale: false, isBest: false, isNew: true,
        query: 'man wearing pink dress shirt formal tailored studio model menswear'
      },
      {
        id: 'm-sh-09',
        name: 'Textured Cotton Seersucker Summer Short-Sleeve Shirt',
        color: { name: 'Navy & White Seersucker', hex: '#1E2D4A' },
        altColors: [{ name: 'Sky Stripe', hex: '#94B8D8' }, { name: 'Chalk White', hex: '#FDFBF7' }],
        price: 40, originalPrice: 50, discount: 20, isSale: true, isBest: false, isNew: false,
        query: 'man wearing seersucker short sleeve shirt summer studio model menswear'
      },
      {
        id: 'm-sh-10',
        name: 'Corduroy Button-Down Utility Overshirt',
        color: { name: 'Caramel Tan', hex: '#A87143' },
        altColors: [{ name: 'Dark Olive', hex: '#444F3C' }, { name: 'Navy', hex: '#18233A' }],
        price: 62, originalPrice: 78, discount: 21, isSale: false, isBest: true, isNew: true,
        query: 'man wearing corduroy overshirt jacket studio model menswear'
      },
      {
        id: 'm-sh-11',
        name: 'Chambray Workwear Double-Pocket Shirt',
        color: { name: 'Classic Chambray Blue', hex: '#587A9E' },
        altColors: [{ name: 'Light Chambray', hex: '#87A9CC' }, { name: 'Charcoal Grey', hex: '#3E4249' }],
        price: 46, originalPrice: 58, discount: 21, isSale: true, isBest: false, isNew: false,
        query: 'man wearing chambray workwear button up shirt studio model menswear'
      },
      {
        id: 'm-sh-12',
        name: 'Tropical Botanical Print Cuban Collar Shirt',
        color: { name: 'Olive Palm Print', hex: '#5E7051' },
        altColors: [{ name: 'Terracotta Print', hex: '#B86249' }, { name: 'Navy Print', hex: '#18243C' }],
        price: 39, originalPrice: 50, discount: 22, isSale: true, isBest: false, isNew: true,
        query: 'man wearing hawaiian tropical print floral short sleeve shirt studio model menswear'
      },
      {
        id: 'm-sh-13',
        name: 'Stretch Pinpoint Cotton Slim-Fit Dress Shirt',
        color: { name: 'Charcoal Grey', hex: '#3B3E45' },
        altColors: [{ name: 'Deep Navy', hex: '#162238' }, { name: 'White', hex: '#FFFFFF' }],
        price: 49, originalPrice: 62, discount: 21, isSale: false, isBest: true, isNew: false,
        query: 'man wearing grey dress shirt slim fit formal studio model menswear'
      },
      {
        id: 'm-sh-14',
        name: 'Micro-Gingham Check Long-Sleeve Button-Down',
        color: { name: 'Burgundy Check', hex: '#631E2A' },
        altColors: [{ name: 'Navy Check', hex: '#18243A' }, { name: 'Black Check', hex: '#222222' }],
        price: 44, originalPrice: 55, discount: 20, isSale: true, isBest: false, isNew: false,
        query: 'man wearing gingham check button down shirt studio model menswear'
      },
      {
        id: 'm-sh-15',
        name: 'Washed Silk-Cotton Blend Evening Shirt',
        color: { name: 'Midnight Black', hex: '#161616' },
        altColors: [{ name: 'Deep Emerald', hex: '#0B472F' }, { name: 'Ivory', hex: '#FAF7EE' }],
        price: 65, originalPrice: 85, discount: 24, isSale: true, isBest: false, isNew: true,
        query: 'man wearing black silk dress shirt luxury studio model menswear'
      },
      {
        id: 'm-sh-16',
        name: 'Relaxed Fit Gauze Double-Cloth Casual Shirt',
        color: { name: 'Buttercream Ecru', hex: '#EDE6D4' },
        altColors: [{ name: 'Soft Charcoal', hex: '#484C54' }, { name: 'Muted Rust', hex: '#AD5942' }],
        price: 47, originalPrice: 60, discount: 22, isSale: false, isBest: true, isNew: false,
        query: 'man wearing cream beige relaxed casual button down shirt studio model menswear'
      },
      {
        id: 'm-sh-17',
        name: 'Tartan Check Brushed Cotton Flannel Shirt',
        color: { name: 'Red & Navy Plaid', hex: '#94222D' },
        altColors: [{ name: 'Green Tartan', hex: '#224B35' }, { name: 'Yellow Plaid', hex: '#C29828' }],
        price: 56, originalPrice: 70, discount: 20, isSale: true, isBest: false, isNew: false,
        query: 'man wearing red plaid flannel shirt studio model menswear'
      },
      {
        id: 'm-sh-18',
        name: 'Vintage Bowling Retro Striped Short-Sleeve Shirt',
        color: { name: 'Cream & Terracotta Stripe', hex: '#E8D2BD' },
        altColors: [{ name: 'Black & White', hex: '#1E1E1E' }, { name: 'Teal & Cream', hex: '#31737E' }],
        price: 42, originalPrice: 54, discount: 22, isSale: false, isBest: false, isNew: true,
        query: 'man wearing retro bowling shirt striped camp collar studio model menswear'
      },
      {
        id: 'm-sh-19',
        name: 'Tailored French Cuff Formal Tuxedo Shirt',
        color: { name: 'Bright White', hex: '#FFFFFF' },
        altColors: [{ name: 'Pale Ecru', hex: '#FDFBF7' }],
        price: 68, originalPrice: 90, discount: 24, isSale: true, isBest: false, isNew: false,
        query: 'man wearing white formal tuxedo dress shirt french cuffs studio model menswear'
      },
      {
        id: 'm-sh-20',
        name: 'Japanese Selvedge Chambray Utility Shirt',
        color: { name: 'Deep Raw Indigo', hex: '#162844' },
        altColors: [{ name: 'Vintage Faded', hex: '#6384A6' }],
        price: 72, originalPrice: 95, discount: 24, isSale: false, isBest: true, isNew: true,
        query: 'man wearing dark indigo denim workwear shirt studio model menswear'
      }
    ]
  },

  // ===================== T-SHIRTS (20) =====================
  {
    category: 'T-shirts',
    dir: 't-shirts',
    items: [
      {
        id: 'm-ts-01',
        name: 'Heavyweight 280GSM Organic Cotton Crewneck Tee',
        color: { name: 'Washed Charcoal', hex: '#383C42' },
        altColors: [{ name: 'Optic White', hex: '#FAFAFA' }, { name: 'Jet Black', hex: '#131313' }],
        price: 28, originalPrice: 35, discount: 20, isSale: false, isBest: true, isNew: false,
        query: 'man wearing plain charcoal grey t shirt studio model menswear'
      },
      {
        id: 'm-ts-02',
        name: 'Classic Ribbed Cotton Henley Long-Sleeve Shirt',
        color: { name: 'Heather Grey', hex: '#9E9EA2' },
        altColors: [{ name: 'Navy', hex: '#19263E' }, { name: 'Off-White', hex: '#F7F5EE' }],
        price: 36, originalPrice: 45, discount: 20, isSale: true, isBest: true, isNew: false,
        query: 'man wearing grey long sleeve henley shirt studio model menswear'
      },
      {
        id: 'm-ts-03',
        name: 'Mercerized Cotton Short-Sleeve Polo Shirt',
        color: { name: 'Midnight Navy', hex: '#16233B' },
        altColors: [{ name: 'Burgundy', hex: '#581926' }, { name: 'White', hex: '#FFFFFF' }],
        price: 39, originalPrice: 50, discount: 22, isSale: true, isBest: true, isNew: true,
        query: 'man wearing navy blue polo shirt studio model menswear'
      },
      {
        id: 'm-ts-04',
        name: 'Vintage Wash Relaxed Drop-Shoulder Pocket Tee',
        color: { name: 'Faded Olive', hex: '#55634D' },
        altColors: [{ name: 'Vintage Brown', hex: '#634F40' }, { name: 'Faded Black', hex: '#2B2D31' }],
        price: 30, originalPrice: 38, discount: 21, isSale: false, isBest: false, isNew: true,
        query: 'man wearing olive green pocket t-shirt studio model menswear'
      },
      {
        id: 'm-ts-05',
        name: 'Supima Cotton Ultra-Soft Slim Crewneck T-Shirt',
        color: { name: 'Pure White', hex: '#FFFFFF' },
        altColors: [{ name: 'Heather Grey', hex: '#AEB1B8' }, { name: 'Black', hex: '#151515' }],
        price: 25, originalPrice: 32, discount: 22, isSale: false, isBest: true, isNew: false,
        query: 'man wearing plain white t shirt studio model menswear'
      },
      {
        id: 'm-ts-06',
        name: 'Waffle-Knit Thermal Long-Sleeve Henley Top',
        color: { name: 'Oatmeal Cream', hex: '#DDD4C4' },
        altColors: [{ name: 'Army Olive', hex: '#485542' }, { name: 'Charcoal', hex: '#31343B' }],
        price: 42, originalPrice: 54, discount: 22, isSale: true, isBest: false, isNew: false,
        query: 'man wearing waffle knit thermal henley long sleeve shirt studio model menswear'
      },
      {
        id: 'm-ts-07',
        name: 'Knitted Silk-Cotton Blend Textured Polo',
        color: { name: 'Warm Camel', hex: '#BD9165' },
        altColors: [{ name: 'Cream Vanilla', hex: '#F0EBD8' }, { name: 'Espresso', hex: '#402E25' }],
        price: 52, originalPrice: 65, discount: 20, isSale: false, isBest: true, isNew: true,
        query: 'man wearing knit polo shirt camel brown studio model menswear'
      },
      {
        id: 'm-ts-08',
        name: 'Vintage Graphic Heritage Outdoor Explorer Tee',
        color: { name: 'Off-White Ecru', hex: '#F3EFE4' },
        altColors: [{ name: 'Washed Navy', hex: '#2A3C56' }, { name: 'Charcoal', hex: '#383B40' }],
        price: 32, originalPrice: 40, discount: 20, isSale: true, isBest: false, isNew: false,
        query: 'man wearing vintage graphic print t shirt outdoor studio model menswear'
      },
      {
        id: 'm-ts-09',
        name: 'Classic Breton Striped Nautical Cotton Tee',
        color: { name: 'Navy & White Stripe', hex: '#1A2944' },
        altColors: [{ name: 'Black & Cream', hex: '#222222' }, { name: 'Olive & White', hex: '#4E5A47' }],
        price: 34, originalPrice: 42, discount: 19, isSale: false, isBest: true, isNew: false,
        query: 'man wearing striped breton sailor t shirt nautical studio model menswear'
      },
      {
        id: 'm-ts-10',
        name: 'Garment-Dyed Heavyweight Pocket T-Shirt',
        color: { name: 'Terracotta Rust', hex: '#BA5D43' },
        altColors: [{ name: 'Mustard', hex: '#CFA02E' }, { name: 'Teal Blue', hex: '#2C6E7D' }],
        price: 29, originalPrice: 36, discount: 19, isSale: true, isBest: false, isNew: true,
        query: 'man wearing terracotta rust pocket t shirt studio model menswear'
      },
      {
        id: 'm-ts-11',
        name: 'Modal Stretch Breathable V-Neck Tee',
        color: { name: 'Pitch Black', hex: '#141414' },
        altColors: [{ name: 'White', hex: '#FAFAFA' }, { name: 'Heather Grey', hex: '#9CA0A8' }],
        price: 24, originalPrice: 30, discount: 20, isSale: false, isBest: false, isNew: false,
        query: 'man wearing black v-neck t shirt studio model menswear'
      },
      {
        id: 'm-ts-12',
        name: 'Textured Slub Cotton Relaxed Crewneck Tee',
        color: { name: 'Muted Indigo Blue', hex: '#486B8F' },
        altColors: [{ name: 'Sage Green', hex: '#778873' }, { name: 'Sand', hex: '#D8CBB6' }],
        price: 27, originalPrice: 34, discount: 21, isSale: true, isBest: false, isNew: false,
        query: 'man wearing blue slub cotton t-shirt studio model menswear'
      },
      {
        id: 'm-ts-13',
        name: 'Zipper-Collar Modern Minimalist Knit Polo',
        color: { name: 'Dark Slate Grey', hex: '#373A42' },
        altColors: [{ name: 'Off-White', hex: '#F5F5F0' }, { name: 'Deep Burgundy', hex: '#521B27' }],
        price: 46, originalPrice: 58, discount: 21, isSale: false, isBest: true, isNew: true,
        query: 'man wearing zip polo shirt collar knit studio model menswear'
      },
      {
        id: 'm-ts-14',
        name: 'Raglan Sleeve Athletic Baseball Long-Sleeve Tee',
        color: { name: 'White & Navy Raglan', hex: '#EBEFF5' },
        altColors: [{ name: 'Heather & Black', hex: '#8C9098' }, { name: 'Cream & Burgundy', hex: '#DFC8CB' }],
        price: 33, originalPrice: 42, discount: 21, isSale: true, isBest: false, isNew: false,
        query: 'man wearing raglan baseball tee long sleeve studio model menswear'
      },
      {
        id: 'm-ts-15',
        name: 'Retro Contrast Trim Ribbed Collar Ringer Tee',
        color: { name: 'White & Forest Green Ringer', hex: '#F7FAF7' },
        altColors: [{ name: 'Cream & Navy', hex: '#ECE8DF' }, { name: 'Yellow & Brown', hex: '#E6C687' }],
        price: 29, originalPrice: 36, discount: 19, isSale: false, isBest: false, isNew: true,
        query: 'man wearing ringer t shirt contrast collar retro studio model menswear'
      },
      {
        id: 'm-ts-16',
        name: 'Garment-Washed Distressed Vintage Band T-Shirt',
        color: { name: 'Washed Black Acid', hex: '#26272B' },
        altColors: [{ name: 'Faded Charcoal', hex: '#3D3E42' }],
        price: 35, originalPrice: 45, discount: 22, isSale: true, isBest: true, isNew: false,
        query: 'man wearing vintage graphic band t shirt black studio model menswear'
      },
      {
        id: 'm-ts-17',
        name: 'Fine-Gauge Merino Wool Short-Sleeve Knit Tee',
        color: { name: 'Rich Espresso Brown', hex: '#3E2A20' },
        altColors: [{ name: 'Charcoal Grey', hex: '#393C42' }, { name: 'Navy', hex: '#172238' }],
        price: 58, originalPrice: 75, discount: 23, isSale: false, isBest: false, isNew: true,
        query: 'man wearing merino wool knit t-shirt brown luxury studio model menswear'
      },
      {
        id: 'm-ts-18',
        name: 'French Terry Short-Sleeve Sweatshirt Tee',
        color: { name: 'Muted Sage', hex: '#7E917B' },
        altColors: [{ name: 'Oatmeal', hex: '#DED6C7' }, { name: 'Washed Black', hex: '#292B2E' }],
        price: 38, originalPrice: 48, discount: 21, isSale: true, isBest: false, isNew: false,
        query: 'man wearing short sleeve sweatshirt terry tee studio model menswear'
      },
      {
        id: 'm-ts-19',
        name: 'Open-Collar Johnny Ribbed Knit Polo',
        color: { name: 'Mocha Tan', hex: '#96745A' },
        altColors: [{ name: 'Cream', hex: '#F3EFE4' }, { name: 'Dark Green', hex: '#214231' }],
        price: 48, originalPrice: 60, discount: 20, isSale: false, isBest: true, isNew: true,
        query: 'man wearing open collar johnny collar knit polo shirt studio model menswear'
      },
      {
        id: 'm-ts-20',
        name: 'Raw-Edge Hem Relaxed Everyday Casual Tee',
        color: { name: 'Sand Beige', hex: '#CFC2AB' },
        altColors: [{ name: 'Clay Red', hex: '#A34F3D' }, { name: 'Washed Blue', hex: '#587A9E' }],
        price: 26, originalPrice: 32, discount: 19, isSale: true, isBest: false, isNew: false,
        query: 'man wearing sand beige plain t shirt studio model menswear'
      }
    ]
  },

  // ===================== JEANS (20) =====================
  {
    category: 'Jeans',
    dir: 'jeans',
    items: [
      {
        id: 'm-jn-01',
        name: 'Classic Straight Fit 14oz Denim Jeans',
        color: { name: 'Medium Stonewash Indigo', hex: '#4A6B8F' },
        altColors: [{ name: 'Dark Indigo Rinse', hex: '#1B2C4B' }, { name: 'Washed Black', hex: '#2B2D31' }],
        price: 68, originalPrice: 85, discount: 20, isSale: true, isBest: true, isNew: false,
        query: 'man wearing straight leg denim jeans studio model menswear'
      },
      {
        id: 'm-jn-02',
        name: 'Slim Tapered Stretch Everyday Denim Jeans',
        color: { name: 'Dark Indigo Clean Rinse', hex: '#1C2E4C' },
        altColors: [{ name: 'Mid Blue', hex: '#4D7299' }, { name: 'Pitch Black', hex: '#141414' }],
        price: 62, originalPrice: 78, discount: 21, isSale: false, isBest: true, isNew: true,
        query: 'man wearing slim fit tapered denim jeans dark wash studio model menswear'
      },
      {
        id: 'm-jn-03',
        name: '90s Relaxed Loose Fit Vintage Skater Jeans',
        color: { name: 'Light Blue Vintage Wash', hex: '#85A6C7' },
        altColors: [{ name: 'Faded Stonewash', hex: '#6385A8' }, { name: 'Washed Grey', hex: '#52555C' }],
        price: 74, originalPrice: 95, discount: 22, isSale: true, isBest: true, isNew: false,
        query: 'man wearing loose fit baggy relaxed denim jeans studio model menswear'
      },
      {
        id: 'm-jn-04',
        name: 'Authentic Japanese Selvedge Raw Denim Jeans',
        color: { name: 'Inky Raw Selvedge Indigo', hex: '#121E33' },
        altColors: [{ name: 'Deep One-Wash', hex: '#172742' }],
        price: 98, originalPrice: 130, discount: 25, isSale: true, isBest: false, isNew: true,
        query: 'man wearing selvedge raw denim jeans cuffed studio model menswear'
      },
      {
        id: 'm-jn-05',
        name: 'Athletic Fit Roomy Thigh Straight Leg Jeans',
        color: { name: 'Washed Black Denim', hex: '#282A2E' },
        altColors: [{ name: 'Dark Blue', hex: '#1E3252' }, { name: 'Medium Wash', hex: '#4B6E94' }],
        price: 64, originalPrice: 80, discount: 20, isSale: false, isBest: true, isNew: false,
        query: 'man wearing black denim jeans straight leg studio model menswear'
      },
      {
        id: 'm-jn-06',
        name: 'Clean Tailored Five-Pocket Denim Pants',
        color: { name: 'Midnight Navy Denim', hex: '#18243A' },
        altColors: [{ name: 'Charcoal', hex: '#373A40' }, { name: 'Khaki Denim', hex: '#776E5B' }],
        price: 72, originalPrice: 90, discount: 20, isSale: true, isBest: false, isNew: false,
        query: 'man wearing dark navy five pocket denim trousers studio model menswear'
      },
      {
        id: 'm-jn-07',
        name: 'Distressed Knee Vintage Wash Denim Jeans',
        color: { name: 'Faded Sun Bleach Blue', hex: '#94B4D4' },
        altColors: [{ name: 'Medium Ripped', hex: '#527599' }, { name: 'Grey Distressed', hex: '#5A5E66' }],
        price: 69, originalPrice: 88, discount: 22, isSale: true, isBest: false, isNew: true,
        query: 'man wearing ripped distressed knee denim jeans studio model menswear'
      },
      {
        id: 'm-jn-08',
        name: 'Straight Leg Ecru Natural Bull Denim Jeans',
        color: { name: 'Chalk Off-White Ecru', hex: '#EDE8DB' },
        altColors: [{ name: 'Desert Sand', hex: '#D6C7AE' }, { name: 'Olive Bull', hex: '#5D6652' }],
        price: 76, originalPrice: 95, discount: 20, isSale: false, isBest: true, isNew: true,
        query: 'man wearing white ecru denim jeans straight leg studio model menswear'
      },
      {
        id: 'm-jn-09',
        name: 'Slim Fit Performance High-Stretch Black Jeans',
        color: { name: 'Pitch Black Jet', hex: '#111111' },
        altColors: [{ name: 'Washed Grey', hex: '#4A4D54' }, { name: 'Dark Blue', hex: '#1B2C48' }],
        price: 58, originalPrice: 72, discount: 19, isSale: false, isBest: true, isNew: false,
        query: 'man wearing slim black stretch denim jeans studio model menswear'
      },
      {
        id: 'm-jn-10',
        name: 'Vintage Bootcut Silhouette Heritage Jeans',
        color: { name: 'Deep Ocean Blue', hex: '#2C496A' },
        altColors: [{ name: 'Mid Wash', hex: '#52769E' }, { name: 'Dark Indigo', hex: '#1B2A44' }],
        price: 70, originalPrice: 88, discount: 20, isSale: true, isBest: false, isNew: false,
        query: 'man wearing bootcut denim jeans boots studio model menswear'
      },
      {
        id: 'm-jn-11',
        name: 'Carpenter Utility Denim Pants with Hammer Loop',
        color: { name: 'Stonewash Workwear Blue', hex: '#56789C' },
        altColors: [{ name: 'Natural Hickory', hex: '#E0D8C8' }, { name: 'Washed Black', hex: '#2F3136' }],
        price: 78, originalPrice: 98, discount: 20, isSale: true, isBest: false, isNew: true,
        query: 'man wearing carpenter jeans denim utility pants studio model menswear'
      },
      {
        id: 'm-jn-12',
        name: 'Wide-Leg Baggy Skateboarding Denim Trousers',
        color: { name: 'Vintage Light Indigo', hex: '#87A9C9' },
        altColors: [{ name: 'Medium Wash', hex: '#507399' }, { name: 'Raw Inky Blue', hex: '#19263D' }],
        price: 75, originalPrice: 95, discount: 21, isSale: false, isBest: true, isNew: true,
        query: 'man wearing wide leg loose skater denim jeans studio model menswear'
      },
      {
        id: 'm-jn-13',
        name: 'Acid Wash Grey Relaxed Tapered Jeans',
        color: { name: 'Mineral Grey Acid Wash', hex: '#595E66' },
        altColors: [{ name: 'Light Blue Acid', hex: '#7C9BB8' }, { name: 'Charcoal', hex: '#373A40' }],
        price: 66, originalPrice: 82, discount: 20, isSale: true, isBest: false, isNew: false,
        query: 'man wearing grey acid wash denim jeans studio model menswear'
      },
      {
        id: 'm-jn-14',
        name: 'Clean Rinse Tapered Crop Ankle Jeans',
        color: { name: 'Deep Clean Blue', hex: '#1F3452' },
        altColors: [{ name: 'Mid Stonewash', hex: '#54789C' }, { name: 'Black', hex: '#161616' }],
        price: 63, originalPrice: 79, discount: 20, isSale: false, isBest: false, isNew: false,
        query: 'man wearing cropped tapered ankle denim jeans studio model menswear'
      },
      {
        id: 'm-jn-15',
        name: 'Distressed Vintage Paint-Splatter Work Jeans',
        color: { name: 'Workwear Medium Wash', hex: '#4E7094' },
        altColors: [{ name: 'Washed Canvas', hex: '#C7B89E' }],
        price: 84, originalPrice: 110, discount: 24, isSale: true, isBest: false, isNew: true,
        query: 'man wearing distressed paint splatter workwear denim jeans studio model menswear'
      },
      {
        id: 'm-jn-16',
        name: 'Rigid Cotton Heavyweight Vintage 501-Style Jeans',
        color: { name: 'Authentic Classic Blue', hex: '#3E6187' },
        altColors: [{ name: 'Dark Indigo', hex: '#1A2A42' }, { name: 'Light Blue', hex: '#83A5C7' }],
        price: 79, originalPrice: 99, discount: 20, isSale: false, isBest: true, isNew: false,
        query: 'man wearing vintage straight 501 denim jeans studio model menswear'
      },
      {
        id: 'm-jn-17',
        name: 'Washed Brown Earth-Tone Heritage Denim Jeans',
        color: { name: 'Cognac Brown Denim', hex: '#734E35' },
        altColors: [{ name: 'Olive Khaki Denim', hex: '#565D4B' }, { name: 'Tan Sand', hex: '#C2AC8A' }],
        price: 71, originalPrice: 90, discount: 21, isSale: true, isBest: false, isNew: true,
        query: 'man wearing brown colored denim jeans trousers studio model menswear'
      },
      {
        id: 'm-jn-18',
        name: 'Pleated Front Relaxed Denim Trousers',
        color: { name: 'Raw Dark Indigo Denim', hex: '#16233B' },
        altColors: [{ name: 'Medium Wash', hex: '#4F7196' }, { name: 'Ecru', hex: '#EDE7DC' }],
        price: 82, originalPrice: 105, discount: 22, isSale: false, isBest: false, isNew: true,
        query: 'man wearing pleated denim trousers wide leg studio model menswear'
      },
      {
        id: 'm-jn-19',
        name: 'Bleached Summer Wash Straight Denim Jeans',
        color: { name: 'Ice Light Blue Bleach', hex: '#9CBBD9' },
        altColors: [{ name: 'Classic Stonewash', hex: '#5B7E9F' }],
        price: 65, originalPrice: 82, discount: 21, isSale: true, isBest: false, isNew: false,
        query: 'man wearing bleach wash light blue denim jeans studio model menswear'
      },
      {
        id: 'm-jn-20',
        name: 'Indigo Selvedge Regular Fit Heritage Jeans',
        color: { name: 'One-Wash Rinse Indigo', hex: '#192C48' },
        altColors: [{ name: 'Medium Fade', hex: '#496A8E' }],
        price: 89, originalPrice: 115, discount: 23, isSale: true, isBest: true, isNew: false,
        query: 'man wearing indigo selvedge jeans regular fit roll up studio model menswear'
      }
    ]
  },

  // ===================== TROUSERS (20) =====================
  {
    category: 'Trousers',
    dir: 'trousers',
    items: [
      {
        id: 'm-tr-01',
        name: 'Slim-Fit Stretch Cotton Chino Trousers',
        color: { name: 'British Khaki Tan', hex: '#C2A379' },
        altColors: [{ name: 'Navy Blue', hex: '#17243B' }, { name: 'Olive Green', hex: '#4B5741' }],
        price: 49, originalPrice: 62, discount: 21, isSale: false, isBest: true, isNew: false,
        query: 'man wearing khaki chino pants trousers studio model menswear'
      },
      {
        id: 'm-tr-02',
        name: 'Front-Pleated Relaxed Wool Flannel Trousers',
        color: { name: 'Charcoal Grey Flannel', hex: '#3C4047' },
        altColors: [{ name: 'Light Grey Melange', hex: '#8F939A' }, { name: 'Navy', hex: '#19253A' }],
        price: 78, originalPrice: 98, discount: 20, isSale: true, isBest: true, isNew: false,
        query: 'man wearing charcoal grey pleated wool dress trousers studio model menswear'
      },
      {
        id: 'm-tr-03',
        name: 'Pure Washed Linen Drawstring Summer Pants',
        color: { name: 'Natural Sand Ecru', hex: '#DED5C4' },
        altColors: [{ name: 'Bright White', hex: '#FFFFFF' }, { name: 'Muted Olive', hex: '#58674E' }],
        price: 54, originalPrice: 68, discount: 21, isSale: true, isBest: false, isNew: true,
        query: 'man wearing linen drawstring pants trousers summer studio model menswear'
      },
      {
        id: 'm-tr-04',
        name: 'Tailored Wool-Blend Dress Suit Trousers',
        color: { name: 'Midnight Navy', hex: '#141E30' },
        altColors: [{ name: 'Charcoal', hex: '#33363D' }, { name: 'Black', hex: '#171717' }],
        price: 68, originalPrice: 85, discount: 20, isSale: false, isBest: true, isNew: false,
        query: 'man wearing tailored navy suit trousers dress pants studio model menswear'
      },
      {
        id: 'm-tr-05',
        name: 'Cotton Twill Utility Cargo Pants with Flap Pockets',
        color: { name: 'Military Olive Green', hex: '#4F5E45' },
        altColors: [{ name: 'Desert Khaki', hex: '#B8A17E' }, { name: 'Washed Black', hex: '#2C2E33' }],
        price: 59, originalPrice: 75, discount: 21, isSale: true, isBest: true, isNew: false,
        query: 'man wearing olive green cargo pants utility trousers studio model menswear'
      },
      {
        id: 'm-tr-06',
        name: 'Wide-Leg Double-Pleated Draped Trousers',
        color: { name: 'Warm Camel Beige', hex: '#B89269' },
        altColors: [{ name: 'Oatmeal', hex: '#E0D6C5' }, { name: 'Noir Black', hex: '#161616' }],
        price: 72, originalPrice: 90, discount: 20, isSale: false, isBest: false, isNew: true,
        query: 'man wearing wide leg pleated trousers beige pants studio model menswear'
      },
      {
        id: 'm-tr-07',
        name: 'Stretch Commuter Travel Technical Trousers',
        color: { name: 'Classic Black', hex: '#181818' },
        altColors: [{ name: 'Dark Navy', hex: '#16233B' }, { name: 'Asphalt Grey', hex: '#434750' }],
        price: 64, originalPrice: 80, discount: 20, isSale: true, isBest: true, isNew: false,
        query: 'man wearing black commuter stretch pants trousers studio model menswear'
      },
      {
        id: 'm-tr-08',
        name: 'Fine-Wale Stretch Corduroy Trousers',
        color: { name: 'Rich Espresso Brown', hex: '#483428' },
        altColors: [{ name: 'Caramel Tan', hex: '#9E6A3F' }, { name: 'Forest Green', hex: '#274431' }],
        price: 65, originalPrice: 82, discount: 21, isSale: false, isBest: false, isNew: true,
        query: 'man wearing brown corduroy pants trousers studio model menswear'
      },
      {
        id: 'm-tr-09',
        name: 'Cotton Linen Blend Smart Casual Chinos',
        color: { name: 'Soft Sage Green', hex: '#778872' },
        altColors: [{ name: 'Sand Khaki', hex: '#D2C2A8' }, { name: 'Sky Blue', hex: '#9BB8D4' }],
        price: 52, originalPrice: 65, discount: 20, isSale: true, isBest: false, isNew: false,
        query: 'man wearing sage green chino trousers studio model menswear'
      },
      {
        id: 'm-tr-10',
        name: 'Elasticated Back Smart Easy-Wear Pants',
        color: { name: 'Slate Grey Melange', hex: '#585C66' },
        altColors: [{ name: 'Dark Navy', hex: '#19263E' }, { name: 'Almond Tan', hex: '#C2AC8F' }],
        price: 48, originalPrice: 60, discount: 20, isSale: false, isBest: true, isNew: false,
        query: 'man wearing elastic waist smart trousers pants studio model menswear'
      },
      {
        id: 'm-tr-11',
        name: 'Houndstooth Checked Heritage Wool Trousers',
        color: { name: 'Brown & Cream Houndstooth', hex: '#5C4A3C' },
        altColors: [{ name: 'Grey Check', hex: '#474A52' }, { name: 'Navy Check', hex: '#1C2940' }],
        price: 85, originalPrice: 110, discount: 23, isSale: true, isBest: false, isNew: true,
        query: 'man wearing houndstooth check wool trousers dress pants studio model menswear'
      },
      {
        id: 'm-tr-12',
        name: 'Cropped Tapered Ankle-Length Chino Pants',
        color: { name: 'Navy Blue', hex: '#18243C' },
        altColors: [{ name: 'Stone Grey', hex: '#878B94' }, { name: 'Khaki', hex: '#C5A982' }],
        price: 50, originalPrice: 64, discount: 22, isSale: false, isBest: false, isNew: false,
        query: 'man wearing cropped ankle chino pants trousers sneakers studio model menswear'
      },
      {
        id: 'm-tr-13',
        name: 'Heavyweight Cotton Cavalry Twill Work Trousers',
        color: { name: 'Tan Beige', hex: '#BA9C76' },
        altColors: [{ name: 'Olive Green', hex: '#4F5C45' }, { name: 'Charcoal', hex: '#393C42' }],
        price: 66, originalPrice: 84, discount: 21, isSale: true, isBest: false, isNew: true,
        query: 'man wearing heavy cotton twill work trousers pants studio model menswear'
      },
      {
        id: 'm-tr-14',
        name: 'Pleated Seersucker Breathable Summer Trousers',
        color: { name: 'Navy & White Seersucker', hex: '#1D2D49' },
        altColors: [{ name: 'Light Blue Stripe', hex: '#8BAFCF' }],
        price: 58, originalPrice: 72, discount: 19, isSale: false, isBest: false, isNew: true,
        query: 'man wearing seersucker pants summer trousers studio model menswear'
      },
      {
        id: 'm-tr-15',
        name: 'Drawstring Hem Ripstop Tactical Cargo Pants',
        color: { name: 'Dark Olive Khaki', hex: '#414D38' },
        altColors: [{ name: 'Black', hex: '#171717' }, { name: 'Wolf Grey', hex: '#5E626B' }],
        price: 62, originalPrice: 78, discount: 21, isSale: true, isBest: true, isNew: false,
        query: 'man wearing tactical cargo pants drawstring trousers studio model menswear'
      },
      {
        id: 'm-tr-16',
        name: 'Relaxed Gurkha High-Waist Double-Buckle Trousers',
        color: { name: 'Ivory Ecru Off-White', hex: '#EAE4D5' },
        altColors: [{ name: 'British Khaki', hex: '#B89B72' }, { name: 'Navy', hex: '#162238' }],
        price: 88, originalPrice: 115, discount: 23, isSale: true, isBest: false, isNew: true,
        query: 'man wearing gurkha trousers buckle high waist pants studio model menswear'
      },
      {
        id: 'm-tr-17',
        name: 'Pinstripe Tailored Wool Formal Dress Pants',
        color: { name: 'Navy Pinstripe', hex: '#16233B' },
        altColors: [{ name: 'Charcoal Pinstripe', hex: '#31353D' }],
        price: 76, originalPrice: 95, discount: 20, isSale: false, isBest: false, isNew: false,
        query: 'man wearing pinstripe dress pants formal suit trousers studio model menswear'
      },
      {
        id: 'm-tr-18',
        name: 'Cotton Sateen Formal Tuxedo Trousers with Satin Stripe',
        color: { name: 'Noir Black Tuxedo', hex: '#121212' },
        altColors: [{ name: 'Midnight Blue', hex: '#141E30' }],
        price: 92, originalPrice: 120, discount: 23, isSale: true, isBest: false, isNew: false,
        query: 'man wearing tuxedo trousers black formal satin side stripe studio model menswear'
      },
      {
        id: 'm-tr-19',
        name: 'Brushed Cotton Moleskin Winter Trousers',
        color: { name: 'Forest Green Moleskin', hex: '#274431' },
        altColors: [{ name: 'Rust Orange', hex: '#A34F38' }, { name: 'Dark Tan', hex: '#876948' }],
        price: 69, originalPrice: 88, discount: 22, isSale: false, isBest: true, isNew: true,
        query: 'man wearing moleskin trousers winter pants green studio model menswear'
      },
      {
        id: 'm-tr-20',
        name: 'Tapered Fit Lightweight Poplin Summer Chinos',
        color: { name: 'Stone Cream Beige', hex: '#DDD2BF' },
        altColors: [{ name: 'Sky Blue', hex: '#9BB8D8' }, { name: 'Washed Navy', hex: '#243754' }],
        price: 46, originalPrice: 58, discount: 21, isSale: true, isBest: false, isNew: false,
        query: 'man wearing stone beige light chinos trousers summer studio model menswear'
      }
    ]
  },

  // ===================== JACKETS (20) =====================
  {
    category: 'Jackets',
    dir: 'jackets',
    items: [
      {
        id: 'm-jk-01',
        name: 'Classic Double-Breasted Tailored Wool Blazer',
        color: { name: 'Navy Blue Gold Button', hex: '#16243D' },
        altColors: [{ name: 'Charcoal Grey', hex: '#363940' }, { name: 'Black', hex: '#151515' }],
        price: 135, originalPrice: 175, discount: 23, isSale: true, isBest: true, isNew: false,
        query: 'man wearing navy double breasted wool blazer jacket studio model menswear'
      },
      {
        id: 'm-jk-02',
        name: 'Heavyweight Faux-Leather Biker Moto Jacket',
        color: { name: 'Noir Black Leather', hex: '#141414' },
        altColors: [{ name: 'Dark Burgundy', hex: '#4F1822' }, { name: 'Espresso', hex: '#36261E' }],
        price: 98, originalPrice: 125, discount: 22, isSale: false, isBest: true, isNew: false,
        query: 'man wearing black leather biker motorcycle jacket studio model menswear'
      },
      {
        id: 'm-jk-03',
        name: 'Down-Filled Quilted Hooded Winter Puffer Jacket',
        color: { name: 'Matte Charcoal Grey', hex: '#34383F' },
        altColors: [{ name: 'Jet Black', hex: '#181818' }, { name: 'Olive Green', hex: '#49573E' }],
        price: 145, originalPrice: 195, discount: 26, isSale: true, isBest: true, isNew: true,
        query: 'man wearing winter puffer jacket hooded down coat studio model menswear'
      },
      {
        id: 'm-jk-04',
        name: 'Vintage Denim Trucker Jacket with Metal Buttons',
        color: { name: 'Medium Wash Indigo Denim', hex: '#4C6E94' },
        altColors: [{ name: 'Washed Black', hex: '#2B2D31' }, { name: 'Light Wash', hex: '#7D9FBF' }],
        price: 76, originalPrice: 95, discount: 20, isSale: false, isBest: true, isNew: false,
        query: 'man wearing denim trucker jacket jeans jacket studio model menswear'
      },
      {
        id: 'm-jk-05',
        name: 'Suede Leather Zip-Front Harrington Bomber Jacket',
        color: { name: 'Caramel Suede Tan', hex: '#A86F3E' },
        altColors: [{ name: 'Chocolate Brown', hex: '#442F24' }, { name: 'Navy', hex: '#18243A' }],
        price: 120, originalPrice: 155, discount: 23, isSale: true, isBest: false, isNew: true,
        query: 'man wearing suede harrington jacket bomber caramel tan studio model menswear'
      },
      {
        id: 'm-jk-06',
        name: 'Sherpa-Fleece Lined Corduroy Trucker Jacket',
        color: { name: 'Warm Tobacco Tan', hex: '#946138' },
        altColors: [{ name: 'Forest Green', hex: '#314432' }, { name: 'Black', hex: '#1A1A1A' }],
        price: 89, originalPrice: 115, discount: 23, isSale: true, isBest: false, isNew: false,
        query: 'man wearing corduroy sherpa lined trucker jacket studio model menswear'
      },
      {
        id: 'm-jk-07',
        name: 'Double-Breasted Wool Peacoat with Anchor Buttons',
        color: { name: 'Midnight Navy Wool', hex: '#141E30' },
        altColors: [{ name: 'Charcoal Grey', hex: '#383B42' }, { name: 'Black', hex: '#161616' }],
        price: 140, originalPrice: 185, discount: 24, isSale: true, isBest: true, isNew: false,
        query: 'man wearing navy wool peacoat coat double breasted studio model menswear'
      },
      {
        id: 'm-jk-08',
        name: 'Water-Resistant Classic Belted Trench Coat',
        color: { name: 'Beige Khaki Trench', hex: '#C9B69B' },
        altColors: [{ name: 'Classic Black', hex: '#181818' }, { name: 'Navy', hex: '#19263E' }],
        price: 130, originalPrice: 170, discount: 24, isSale: false, isBest: true, isNew: true,
        query: 'man wearing beige khaki trench coat double breasted belted studio model menswear'
      },
      {
        id: 'm-jk-09',
        name: 'Minimalist MA-1 Nylon Flight Bomber Jacket',
        color: { name: 'Army Olive Green', hex: '#4A553F' },
        altColors: [{ name: 'Pitch Black', hex: '#161616' }, { name: 'Navy', hex: '#17233B' }],
        price: 78, originalPrice: 98, discount: 20, isSale: true, isBest: false, isNew: false,
        query: 'man wearing ma-1 flight bomber jacket olive green nylon studio model menswear'
      },
      {
        id: 'm-jk-10',
        name: 'Heavyweight Plaid Wool-Blend Shacket Overshirt',
        color: { name: 'Buffalo Red & Black Plaid', hex: '#871E24' },
        altColors: [{ name: 'Green Plaid', hex: '#2E4C38' }, { name: 'Oatmeal Plaid', hex: '#C7B594' }],
        price: 68, originalPrice: 85, discount: 20, isSale: false, isBest: false, isNew: true,
        query: 'man wearing plaid wool shacket jacket heavy overshirt studio model menswear'
      },
      {
        id: 'm-jk-11',
        name: 'Aviator Faux-Shearling Collar Leather Flight Jacket',
        color: { name: 'Dark Brown Leather Shearling', hex: '#3E2A1E' },
        altColors: [{ name: 'Black Shearling', hex: '#1B1B1B' }],
        price: 138, originalPrice: 180, discount: 23, isSale: true, isBest: false, isNew: false,
        query: 'man wearing aviator leather flight jacket shearling collar studio model menswear'
      },
      {
        id: 'm-jk-12',
        name: 'Tailored Herringbone Tweed Wool Sport Coat',
        color: { name: 'Earth Brown Tweed', hex: '#584435' },
        altColors: [{ name: 'Grey Herringbone', hex: '#4A4D54' }, { name: 'Olive Tweed', hex: '#404B38' }],
        price: 125, originalPrice: 160, discount: 22, isSale: false, isBest: true, isNew: false,
        query: 'man wearing tweed sport coat wool blazer jacket studio model menswear'
      },
      {
        id: 'm-jk-13',
        name: 'Lightweight Packable Windbreaker Anorak Jacket',
        color: { name: 'Cobalt Blue & Navy', hex: '#1E58B8' },
        altColors: [{ name: 'Neon Yellow / Black', hex: '#D2E845' }, { name: 'Black', hex: '#191919' }],
        price: 58, originalPrice: 72, discount: 19, isSale: true, isBest: false, isNew: true,
        query: 'man wearing lightweight packable windbreaker jacket outdoor studio model menswear'
      },
      {
        id: 'm-jk-14',
        name: 'Utilitarian Four-Pocket Waxed Cotton Field Jacket',
        color: { name: 'British Olive Wax', hex: '#3B4834' },
        altColors: [{ name: 'Rustic Brown', hex: '#5E3E28' }, { name: 'Navy', hex: '#17243A' }],
        price: 115, originalPrice: 145, discount: 21, isSale: false, isBest: true, isNew: false,
        query: 'man wearing waxed cotton field jacket four pocket studio model menswear'
      },
      {
        id: 'm-jk-15',
        name: 'Quilted Diamond-Stitch Country Riding Jacket',
        color: { name: 'Midnight Navy Quilt', hex: '#152136' },
        altColors: [{ name: 'Olive Green', hex: '#49543E' }, { name: 'Black', hex: '#181818' }],
        price: 94, originalPrice: 120, discount: 22, isSale: true, isBest: false, isNew: true,
        query: 'man wearing quilted diamond jacket corduroy collar country studio model menswear'
      },
      {
        id: 'm-jk-16',
        name: 'Relaxed Fit Track Jacket with Contrast Sleeve Stripe',
        color: { name: 'Black & White Stripe', hex: '#161616' },
        altColors: [{ name: 'Navy & White', hex: '#1A2944' }, { name: 'Green & White', hex: '#214732' }],
        price: 55, originalPrice: 70, discount: 21, isSale: false, isBest: false, isNew: false,
        query: 'man wearing retro track jacket zip up athletic studio model menswear'
      },
      {
        id: 'm-jk-17',
        name: 'Single-Breasted Overcoat in Cashmere-Wool Blend',
        color: { name: 'Camel Tan Overcoat', hex: '#BE9566' },
        altColors: [{ name: 'Charcoal Melange', hex: '#3D4047' }, { name: 'Black', hex: '#171717' }],
        price: 160, originalPrice: 220, discount: 27, isSale: true, isBest: true, isNew: false,
        query: 'man wearing camel wool overcoat tailored long coat studio model menswear'
      },
      {
        id: 'm-jk-18',
        name: 'Hooded Water-Repellent Rain Parka Jacket',
        color: { name: 'Forest Green Parka', hex: '#2C4938' },
        altColors: [{ name: 'Matte Black', hex: '#1A1A1A' }, { name: 'Yellow Ochre', hex: '#D29C28' }],
        price: 99, originalPrice: 130, discount: 24, isSale: true, isBest: false, isNew: true,
        query: 'man wearing hooded rain parka jacket outdoor waterproof studio model menswear'
      },
      {
        id: 'm-jk-19',
        name: 'Zip-Front Polar Fleece Outdoor Jacket',
        color: { name: 'Oatmeal & Navy Fleece', hex: '#DCD4C4' },
        altColors: [{ name: 'Deep Olive', hex: '#4E5A47' }, { name: 'Black', hex: '#181818' }],
        price: 64, originalPrice: 80, discount: 20, isSale: false, isBest: false, isNew: false,
        query: 'man wearing polar fleece jacket zip up outdoor studio model menswear'
      },
      {
        id: 'm-jk-20',
        name: 'Unstructured Washed Linen-Cotton Summer Blazer',
        color: { name: 'Soft Sand Ecru', hex: '#D6C7B2' },
        altColors: [{ name: 'Airforce Blue', hex: '#6384A6' }, { name: 'Muted Sage', hex: '#778873' }],
        price: 110, originalPrice: 140, discount: 21, isSale: true, isBest: true, isNew: true,
        query: 'man wearing linen blazer suit jacket beige summer studio model menswear'
      }
    ]
  },

  // ===================== ACTIVEWEAR (20) =====================
  {
    category: 'Activewear',
    dir: 'activewear',
    items: [
      {
        id: 'm-aw-01',
        name: 'Pro-Performance Breathable Workout T-Shirt',
        color: { name: 'Heather Charcoal', hex: '#373A40' },
        altColors: [{ name: 'Cobalt Blue', hex: '#1A53B5' }, { name: 'Black', hex: '#141414' }],
        price: 28, originalPrice: 35, discount: 20, isSale: false, isBest: true, isNew: false,
        query: 'man athletic training workout gym t shirt studio model menswear'
      },
      {
        id: 'm-aw-02',
        name: '7" 2-in-1 Training Running Shorts with Liner',
        color: { name: 'Pitch Black', hex: '#131313' },
        altColors: [{ name: 'Army Olive', hex: '#4A553E' }, { name: 'Slate Grey', hex: '#4E525C' }],
        price: 34, originalPrice: 42, discount: 19, isSale: true, isBest: true, isNew: false,
        query: 'man 2 in 1 running shorts compression liner gym athletic studio model menswear'
      },
      {
        id: 'm-aw-03',
        name: 'Full-Zip Lightweight Athletic Running Track Jacket',
        color: { name: 'Steel Blue', hex: '#3C6287' },
        altColors: [{ name: 'Black', hex: '#161616' }, { name: 'Wolf Grey', hex: '#878B94' }],
        price: 58, originalPrice: 75, discount: 23, isSale: true, isBest: false, isNew: true,
        query: 'man wearing zip athletic running track jacket gym activewear studio model menswear'
      },
      {
        id: 'm-aw-04',
        name: 'Tapered Fit Technical Stretch Gym Joggers',
        color: { name: 'Dark Grey Heather', hex: '#363940' },
        altColors: [{ name: 'Jet Black', hex: '#151515' }, { name: 'Navy Blue', hex: '#18243A' }],
        price: 48, originalPrice: 60, discount: 20, isSale: false, isBest: true, isNew: false,
        query: 'man wearing gym training joggers tapered athletic pants studio model menswear'
      },
      {
        id: 'm-aw-05',
        name: 'Seamless Muscle-Fit Athletic Sleeveless Gym Tank',
        color: { name: 'Olive Green', hex: '#485641' },
        altColors: [{ name: 'White', hex: '#FAFAFA' }, { name: 'Black', hex: '#171717' }],
        price: 24, originalPrice: 30, discount: 20, isSale: true, isBest: false, isNew: false,
        query: 'man athletic workout sleeveless tank top gym fitness studio model menswear'
      },
      {
        id: 'm-aw-06',
        name: 'Half-Zip Thermal Long-Sleeve Running Pullover',
        color: { name: 'Midnight Navy', hex: '#16233B' },
        altColors: [{ name: 'Heather Grey', hex: '#898D96' }, { name: 'Deep Burgundy', hex: '#581827' }],
        price: 44, originalPrice: 55, discount: 20, isSale: false, isBest: true, isNew: true,
        query: 'man wearing half zip running pullover long sleeve athletic studio model menswear'
      },
      {
        id: 'm-aw-07',
        name: 'High-Impact Performance Compression Gym Tights',
        color: { name: 'Noir Black', hex: '#121212' },
        altColors: [{ name: 'Charcoal Camo', hex: '#33363D' }],
        price: 38, originalPrice: 48, discount: 21, isSale: true, isBest: false, isNew: false,
        query: 'man wearing compression leggings tights running gym workout studio model menswear'
      },
      {
        id: 'm-aw-08',
        name: 'French Terry Relaxed Workout Warmup Hoodie',
        color: { name: 'Oatmeal Melange', hex: '#D2C8B8' },
        altColors: [{ name: 'Charcoal Black', hex: '#2A2B2E' }, { name: 'Sage', hex: '#6E806D' }],
        price: 52, originalPrice: 65, discount: 20, isSale: false, isBest: true, isNew: false,
        query: 'man wearing athletic workout gym hoodie pullover studio model menswear'
      },
      {
        id: 'm-aw-09',
        name: 'Lightweight 5" Speed Running Shorts with Zipper Pocket',
        color: { name: 'Neon Lime & Black', hex: '#C2E83B' },
        altColors: [{ name: 'Electric Blue', hex: '#1A67D2' }, { name: 'Solid Black', hex: '#141414' }],
        price: 30, originalPrice: 38, discount: 21, isSale: true, isBest: false, isNew: true,
        query: 'man wearing running shorts 5 inch athletic gym studio model menswear'
      },
      {
        id: 'm-aw-10',
        name: 'Sweat-Wicking Seamless Training Long-Sleeve Tee',
        color: { name: 'Deep Burgundy', hex: '#5B1724' },
        altColors: [{ name: 'Black', hex: '#161616' }, { name: 'Slate Blue', hex: '#446484' }],
        price: 32, originalPrice: 40, discount: 20, isSale: false, isBest: false, isNew: false,
        query: 'man wearing long sleeve athletic gym workout shirt studio model menswear'
      },
      {
        id: 'm-aw-11',
        name: 'Technical Fleece Warmup Pullover Crewneck',
        color: { name: 'Army Green', hex: '#44523C' },
        altColors: [{ name: 'Heather Grey', hex: '#979AA1' }, { name: 'Black', hex: '#171717' }],
        price: 46, originalPrice: 58, discount: 21, isSale: true, isBest: true, isNew: false,
        query: 'man wearing athletic crewneck sweatshirt workout fleece studio model menswear'
      },
      {
        id: 'm-aw-12',
        name: 'Breathable Mesh Training Basketball Shorts',
        color: { name: 'Navy Blue & White', hex: '#18243C' },
        altColors: [{ name: 'Red & Black', hex: '#871D28' }, { name: 'All Black', hex: '#131313' }],
        price: 28, originalPrice: 35, discount: 20, isSale: false, isBest: false, isNew: true,
        query: 'man wearing basketball mesh shorts athletic training studio model menswear'
      },
      {
        id: 'm-aw-13',
        name: 'Packable Water-Resistant Running Windbreaker',
        color: { name: 'Charcoal & Reflective Silver', hex: '#3B3E45' },
        altColors: [{ name: 'Electric Blue', hex: '#1C5BBA' }, { name: 'Hi-Vis Yellow', hex: '#E2F038' }],
        price: 64, originalPrice: 82, discount: 22, isSale: true, isBest: false, isNew: false,
        query: 'man wearing running windbreaker jacket reflective athletic studio model menswear'
      },
      {
        id: 'm-aw-14',
        name: '4-Way Stretch Athletic Performance Pants',
        color: { name: 'Pitch Black', hex: '#141414' },
        altColors: [{ name: 'Navy', hex: '#16233B' }, { name: 'Castlerock Grey', hex: '#484B52' }],
        price: 54, originalPrice: 68, discount: 21, isSale: false, isBest: true, isNew: false,
        query: 'man wearing stretch athletic training pants workout track pants studio model menswear'
      },
      {
        id: 'm-aw-15',
        name: 'Lightweight Sleeveless Hooded Training Tank',
        color: { name: 'Heather Grey Melange', hex: '#91949C' },
        altColors: [{ name: 'Black', hex: '#161616' }, { name: 'Military Olive', hex: '#4E5A47' }],
        price: 29, originalPrice: 36, discount: 19, isSale: true, isBest: false, isNew: true,
        query: 'man wearing sleeveless hooded gym tank top workout vest studio model menswear'
      },
      {
        id: 'm-aw-16',
        name: 'Thermal Fleece-Lined Outdoor Cold-Weather Running Tights',
        color: { name: 'Black Thermal', hex: '#111111' },
        altColors: [{ name: 'Dark Charcoal', hex: '#2B2D31' }],
        price: 45, originalPrice: 56, discount: 20, isSale: false, isBest: false, isNew: false,
        query: 'man wearing thermal running tights winter athletic workout studio model menswear'
      },
      {
        id: 'm-aw-17',
        name: 'Relaxed Heavyweight Cotton Warmup Sweatpants',
        color: { name: 'Washed Black', hex: '#26272B' },
        altColors: [{ name: 'Heather Grey', hex: '#9E9EA2' }, { name: 'Oatmeal', hex: '#D8CFBF' }],
        price: 49, originalPrice: 62, discount: 21, isSale: true, isBest: true, isNew: false,
        query: 'man wearing heavyweight cotton sweatpants joggers workout studio model menswear'
      },
      {
        id: 'm-aw-18',
        name: 'Dri-Fit Technical Polo for Golf & Training',
        color: { name: 'Clean White Performance', hex: '#FAFAFA' },
        altColors: [{ name: 'Navy', hex: '#16233B' }, { name: 'Sky Blue', hex: '#87ABCE' }],
        price: 36, originalPrice: 45, discount: 20, isSale: false, isBest: true, isNew: true,
        query: 'man wearing white technical golf polo shirt athletic dri-fit studio model menswear'
      },
      {
        id: 'm-aw-19',
        name: 'Half-Zip Lightweight Windproof Cycling Pullover',
        color: { name: 'Bright Crimson & Black', hex: '#BA2230' },
        altColors: [{ name: 'Hi-Vis Yellow', hex: '#DCE83E' }, { name: 'Black', hex: '#161616' }],
        price: 52, originalPrice: 65, discount: 20, isSale: true, isBest: false, isNew: false,
        query: 'man wearing half zip cycling running pullover jacket athletic studio model menswear'
      },
      {
        id: 'm-aw-20',
        name: 'Post-Workout Terry Cloth Zip Tracksuit Jacket',
        color: { name: 'Muted Teal Blue', hex: '#2E6975' },
        altColors: [{ name: 'Oatmeal Cream', hex: '#DFD8C8' }, { name: 'Charcoal', hex: '#31343B' }],
        price: 60, originalPrice: 75, discount: 20, isSale: false, isBest: false, isNew: true,
        query: 'man wearing terry track jacket zip activewear lounge studio model menswear'
      }
    ]
  }
];

async function main() {
  console.log('Starting Men catalog builder...');

  const verifiedProducts = [];

  for (const catGroup of MEN_CATALOG_DEF) {
    console.log(`\n=== Processing Category: ${catGroup.category} (20 items) ===`);
    const catDir = path.join('public/assets/men', catGroup.dir);
    if (!fs.existsSync(catDir)) fs.mkdirSync(catDir, { recursive: true });

    for (let i = 0; i < catGroup.items.length; i++) {
      const item = catGroup.items[i];
      const targetRelPath = `/assets/men/${catGroup.dir}/${item.id}.jpg`;
      const targetAbsPath = path.join('public', targetRelPath);

      let imageSaved = false;

      // Check if file already exists and is valid size
      if (fs.existsSync(targetAbsPath) && fs.statSync(targetAbsPath).size > 20000) {
        imageSaved = true;
      } else {
        console.log(`[${catGroup.category} ${i + 1}/20] Downloading: ${item.name} ...`);
        const searchRes = await searchImage(item.query);
        if (searchRes && searchRes.buffer) {
          const tempPath = `/tmp/raw_${item.id}.jpg`;
          fs.writeFileSync(tempPath, searchRes.buffer);
          try {
            // Resize with ImageMagick to 600x750 (4:5 portrait) with clean cropping and compression
            execSync(`convert "${tempPath}" -resize "600x750^" -gravity center -extent 600x750 -quality 86 "${targetAbsPath}"`);
            if (fs.existsSync(targetAbsPath) && fs.statSync(targetAbsPath).size > 15000) {
              imageSaved = true;
              console.log(`  -> Successfully saved ${targetRelPath} (${fs.statSync(targetAbsPath).size} bytes)`);
            }
          } catch (e) {
            console.error(`  -> ImageMagick error for ${item.id}:`, e.message);
          }
          if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
        } else {
          console.warn(`  -> Could not find image for query: "${item.query}"`);
        }
      }

      // If still not saved, fallback to a reliable curated menswear photo
      if (!imageSaved) {
        console.log(`  -> Using verified menswear fallback for ${item.id}`);
        const fallbackUrl = 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=600&q=80';
        try {
          const fbRes = await fetch(fallbackUrl);
          const fbBuf = await fbRes.arrayBuffer();
          fs.writeFileSync(targetAbsPath, Buffer.from(fbBuf));
          imageSaved = true;
        } catch (e) {}
      }

      // Construct complete Product record
      const slug = `${item.id}-${item.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`;
      const subcats = [catGroup.category];

      const sizes = ['S', 'M', 'L', 'XL', 'XXL'];

      const colorList = [
        item.color,
        ...(item.altColors || [])
      ];

      const product = {
        id: item.id,
        name: item.name,
        slug: slug,
        category: 'men',
        subcategory: catGroup.category,
        subcategories: subcats,
        price: item.price,
        originalPrice: item.originalPrice,
        discountPercentage: item.discount,
        rating: +(4.5 + Math.random() * 0.4).toFixed(1),
        reviewsCount: Math.floor(40 + Math.random() * 120),
        isNew: item.isNew,
        isSale: item.isSale,
        isBestSeller: item.isBest,
        colors: colorList,
        sizes: sizes,
        description: `Premium men's ${item.name.toLowerCase()} tailored with durable construction, comfortable breathable natural fibers, and timeless modern style.`,
        details: [
          'Precision tailored cut engineered for comfort and ease of movement',
          'Crafted from sustainably sourced, heavyweight premium fabrics',
          'Reinforced stress seams and durable bar-tack stitching throughout',
          'Garment-washed to ensure soft hand-feel and zero shrinkage'
        ],
        fabricCare: [
          'Machine wash cold with like colors inside out',
          'Gentle cycle with mild detergent; do not use chlorine bleach',
          'Tumble dry low or line dry in shade; warm iron if required'
        ],
        images: [targetRelPath],
        inStock: true,
        sku: `FAM-M-${catGroup.dir.toUpperCase().substring(0, 3)}-${item.id.replace('m-', '').toUpperCase()}`,
        tags: [
          'men',
          catGroup.category.toLowerCase().replace(/\s+/g, '-'),
          ...item.name.toLowerCase().split(' ').filter(w => w.length > 3)
        ]
      };

      verifiedProducts.push(product);
    }
  }

  // Write TypeScript file src/data/menProducts.ts
  const fileContent = `import { Product } from '../types';\n\nexport const MEN_PRODUCTS: Product[] = ${JSON.stringify(verifiedProducts, null, 2)};\n`;
  fs.writeFileSync('src/data/menProducts.ts', fileContent, 'utf8');
  console.log(`\nSuccessfully wrote ${verifiedProducts.length} verified products to src/data/menProducts.ts`);

  // Generate montages for each category
  console.log('\nGenerating visual verification montages for all 6 Men categories...');
  for (const catGroup of MEN_CATALOG_DEF) {
    const imgList = verifiedProducts
      .filter(p => p.subcategory === catGroup.category)
      .map(p => `public${p.images[0]}`);

    const montageTarget = `public/montage_men_${catGroup.dir.replace('-', '_')}.jpg`;
    try {
      execSync(`montage ${imgList.join(' ')} -tile 5x4 -geometry 240x300+4+4 -title "Men ${catGroup.category} 1 to 20" ${montageTarget}`);
      console.log(`  -> Generated ${montageTarget}`);
    } catch (e) {
      console.error(`  -> Error generating montage for ${catGroup.category}:`, e.message);
    }
  }

  console.log('\nMen catalog build complete!');
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
