const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const { searchImage } = require('./fetch_catalog.cjs');

const TEENS_CATALOG_DEF = [
  // ===================== CASUALWEAR (20) =====================
  {
    category: 'Casualwear',
    dir: 'casualwear',
    items: [
      { id: 'tn-cw-01', name: 'Teens Oversized Relaxed Cargo Pants', color: { name: 'Olive Green', hex: '#4B5320' }, price: 42, originalPrice: 55, discount: 24, isSale: true, isBest: true, isNew: false, query: 'teen wearing baggy cargo pants streetwear outfit full body' },
      { id: 'tn-cw-02', name: 'Teens Striped Knit V-Neck Sweater Vest', color: { name: 'Navy & Cream', hex: '#1B263B' }, price: 34, originalPrice: 42, discount: 19, isSale: false, isBest: true, isNew: true, query: 'teen wearing knit sweater vest preppy aesthetic streetwear' },
      { id: 'tn-cw-03', name: 'Teens Vintage Washed Denim Overshirt', color: { name: 'Washed Indigo', hex: '#4B6B94' }, price: 45, originalPrice: 60, discount: 25, isSale: true, isBest: false, isNew: false, query: 'teen wearing denim overshirt jacket casual aesthetic' },
      { id: 'tn-cw-04', name: 'Teens Plaid Cotton Flannel Button-Down Shacket', color: { name: 'Brown & Tan Plaid', hex: '#795548' }, price: 40, originalPrice: 50, discount: 20, isSale: false, isBest: true, isNew: false, query: 'teen wearing flannel plaid shacket shirt casual' },
      { id: 'tn-cw-05', name: 'Teens Pleated Chino Skate Pants', color: { name: 'Khaki Beige', hex: '#C2B280' }, price: 38, originalPrice: 48, discount: 21, isSale: true, isBest: false, isNew: true, query: 'teen wearing khaki pleated chino skate pants casual' },
      { id: 'tn-cw-06', name: 'Teens Ribbed Knit Zip-Neck Polo Pullover', color: { name: 'Sage Green', hex: '#87A987' }, price: 36, originalPrice: 46, discount: 22, isSale: true, isBest: false, isNew: false, query: 'teen wearing quarter zip polo knit sweater' },
      { id: 'tn-cw-07', name: 'Teens Relaxed Corduroy Carpenter Dungarees', color: { name: 'Caramel Rust', hex: '#A0522D' }, price: 52, originalPrice: 68, discount: 24, isSale: true, isBest: true, isNew: false, query: 'teen wearing corduroy dungarees overalls aesthetic' },
      { id: 'tn-cw-08', name: 'Teens Fleece Zip-Front Colorblock Windbreaker', color: { name: 'Teal & Navy', hex: '#008080' }, price: 48, originalPrice: 62, discount: 23, isSale: false, isBest: false, isNew: true, query: 'teen wearing colorblock windbreaker fleece jacket' },
      { id: 'tn-cw-09', name: 'Teens Contrast Stitch Relaxed Twill Joggers', color: { name: 'Charcoal Grey', hex: '#36454F' }, price: 39, originalPrice: 49, discount: 20, isSale: true, isBest: true, isNew: false, query: 'teen wearing relaxed twill joggers sweatpants streetwear' },
      { id: 'tn-cw-10', name: 'Teens Retro Varsity Letterman Bomber Jacket', color: { name: 'Forest Green & Cream', hex: '#228B22' }, price: 58, originalPrice: 75, discount: 23, isSale: true, isBest: true, isNew: true, query: 'teen wearing varsity letterman jacket college aesthetic' },
      { id: 'tn-cw-11', name: 'Teens Waffle-Knit Long-Sleeve Henley Shirt', color: { name: 'Oatmeal Heather', hex: '#DDD0C8' }, price: 32, originalPrice: 40, discount: 20, isSale: false, isBest: false, isNew: false, query: 'teen wearing waffle long sleeve henley shirt casual' },
      { id: 'tn-cw-12', name: 'Teens Classic Straight-Leg Twill Chinos', color: { name: 'Dark Navy', hex: '#0A1128' }, price: 40, originalPrice: 50, discount: 20, isSale: true, isBest: false, isNew: false, query: 'teen wearing navy straight chino pants casualwear' },
      { id: 'tn-cw-13', name: 'Teens Lightweight Nylon Track Pants', color: { name: 'Jet Black', hex: '#1A1A1A' }, price: 38, originalPrice: 48, discount: 21, isSale: false, isBest: true, isNew: true, query: 'teen wearing black nylon track pants casual sporty' },
      { id: 'tn-cw-14', name: 'Teens Cable Knit Slouchy Crewneck Sweater', color: { name: 'Vanilla Cream', hex: '#FDFBF7' }, price: 44, originalPrice: 56, discount: 21, isSale: true, isBest: false, isNew: false, query: 'teen wearing slouchy cable knit sweater cream' },
      { id: 'tn-cw-15', name: 'Teens Denim Trucker Jacket with Raw Hem', color: { name: 'Light Wash Blue', hex: '#7BA0CD' }, price: 54, originalPrice: 70, discount: 23, isSale: true, isBest: true, isNew: false, query: 'teen wearing light wash denim trucker jacket casual' },
      { id: 'tn-cw-16', name: 'Teens Retro Stripe Knit Cardigan', color: { name: 'Mustard & Navy', hex: '#E1AD01' }, price: 42, originalPrice: 54, discount: 22, isSale: false, isBest: false, isNew: true, query: 'teen wearing striped knit cardigan sweater vintage' },
      { id: 'tn-cw-17', name: 'Teens Utility Multi-Pocket Tactical Vest', color: { name: 'Matte Black', hex: '#232B2B' }, price: 39, originalPrice: 50, discount: 22, isSale: true, isBest: false, isNew: false, query: 'teen wearing utility multi pocket cargo vest casual' },
      { id: 'tn-cw-18', name: 'Teens Terry Cotton Lounge Sweatshorts', color: { name: 'Heather Grey', hex: '#A8A9AD' }, price: 28, originalPrice: 35, discount: 20, isSale: false, isBest: false, isNew: true, query: 'teen wearing sweat shorts casual loungewear' },
      { id: 'tn-cw-19', name: 'Teens Oversized Drop-Shoulder Sweatshirt', color: { name: 'Dusty Rose', hex: '#DCAE96' }, price: 38, originalPrice: 48, discount: 21, isSale: true, isBest: true, isNew: false, query: 'teen wearing oversized crewneck sweatshirt aesthetic' },
      { id: 'tn-cw-20', name: 'Teens Canvas Workwear Chore Jacket', color: { name: 'Tobacco Brown', hex: '#715D48' }, price: 56, originalPrice: 72, discount: 22, isSale: true, isBest: true, isNew: true, query: 'teen wearing canvas chore jacket workwear vintage' }
    ]
  },

  // ===================== DRESSES (20) =====================
  {
    category: 'Dresses',
    dir: 'dresses',
    items: [
      { id: 'tn-dr-01', name: 'Teens Floral Print Ruffle Hem Mini Dress', color: { name: 'Daisy Yellow', hex: '#FAD02C' }, price: 38, originalPrice: 48, discount: 21, isSale: true, isBest: true, isNew: true, query: 'teen girl wearing floral ruffle mini dress summer aesthetic' },
      { id: 'tn-dr-02', name: 'Teens Ribbed Knit Bodycon Tank Midi Dress', color: { name: 'Sage Green', hex: '#9CAF88' }, price: 36, originalPrice: 45, discount: 20, isSale: false, isBest: true, isNew: false, query: 'teen girl wearing ribbed tank midi dress casual' },
      { id: 'tn-dr-03', name: 'Teens Denim Pinafore Overall Dress', color: { name: 'Medium Indigo', hex: '#4A6B82' }, price: 42, originalPrice: 55, discount: 24, isSale: true, isBest: false, isNew: true, query: 'teen girl wearing denim pinafore overall dress aesthetic' },
      { id: 'tn-dr-04', name: 'Teens Smocked Bodice Puff-Sleeve Milkmaid Dress', color: { name: 'Cloud White', hex: '#FAF9F6' }, price: 44, originalPrice: 58, discount: 24, isSale: true, isBest: true, isNew: false, query: 'teen girl wearing white milkmaid puff sleeve dress' },
      { id: 'tn-dr-05', name: 'Teens Pleated Tennis Mini Skater Dress', color: { name: 'Baby Pink', hex: '#F4C2C2' }, price: 35, originalPrice: 44, discount: 20, isSale: false, isBest: true, isNew: true, query: 'teen girl wearing pleated tennis skater dress sporty' },
      { id: 'tn-dr-06', name: 'Teens Satin Cowl Neck Spaghetti Strap Slip Dress', color: { name: 'Champagne Gold', hex: '#F7E7CE' }, price: 48, originalPrice: 62, discount: 23, isSale: true, isBest: false, isNew: false, query: 'teen girl wearing satin slip dress cowl neck party' },
      { id: 'tn-dr-07', name: 'Teens Gingham Check Babydoll Summer Dress', color: { name: 'Black & White Check', hex: '#2B2B2B' }, price: 39, originalPrice: 50, discount: 22, isSale: false, isBest: false, isNew: true, query: 'teen girl wearing gingham check babydoll dress' },
      { id: 'tn-dr-08', name: 'Teens Sweetheart Neckline Tiered Sundress', color: { name: 'Sky Blue', hex: '#87CEEB' }, price: 42, originalPrice: 54, discount: 22, isSale: true, isBest: true, isNew: false, query: 'teen girl wearing sweetheart tiered sundress blue' },
      { id: 'tn-dr-09', name: 'Teens Fine Corduroy Button-Front Shirt Dress', color: { name: 'Warm Rust', hex: '#B7410E' }, price: 46, originalPrice: 58, discount: 21, isSale: true, isBest: false, isNew: false, query: 'teen girl wearing corduroy button front shirt dress' },
      { id: 'tn-dr-10', name: 'Teens Graphic Print Oversized T-Shirt Dress', color: { name: 'Washed Charcoal', hex: '#333333' }, price: 34, originalPrice: 42, discount: 19, isSale: false, isBest: true, isNew: true, query: 'teen girl wearing oversized graphic t-shirt dress streetwear' },
      { id: 'tn-dr-11', name: 'Teens Broderie Anglaise Eyelet White Mini Dress', color: { name: 'Pure White', hex: '#FFFFFF' }, price: 45, originalPrice: 58, discount: 22, isSale: true, isBest: false, isNew: false, query: 'teen girl wearing white eyelet broderie mini dress summer' },
      { id: 'tn-dr-12', name: 'Teens Long-Sleeve Ribbed Skater Dress', color: { name: 'Burgundy Wine', hex: '#800020' }, price: 38, originalPrice: 48, discount: 21, isSale: false, isBest: false, isNew: true, query: 'teen girl wearing long sleeve ribbed skater dress' },
      { id: 'tn-dr-13', name: 'Teens Halter Neck Ruched Party Mini Dress', color: { name: 'Emerald Green', hex: '#50C878' }, price: 44, originalPrice: 56, discount: 21, isSale: true, isBest: true, isNew: false, query: 'teen girl wearing halter neck ruched mini party dress' },
      { id: 'tn-dr-14', name: 'Teens Plaid Tartan Pinafore Dress', color: { name: 'Dark Green Tartan', hex: '#1E4620' }, price: 40, originalPrice: 52, discount: 23, isSale: true, isBest: false, isNew: true, query: 'teen girl wearing plaid pinafore dress skirt aesthetic' },
      { id: 'tn-dr-15', name: 'Teens Floral Chiffon A-Line Wrap Dress', color: { name: 'Lavender Floral', hex: '#E6E6FA' }, price: 43, originalPrice: 55, discount: 22, isSale: false, isBest: true, isNew: false, query: 'teen girl wearing chiffon floral wrap dress pastel' },
      { id: 'tn-dr-16', name: 'Teens Square Neck Linen Blend Shift Dress', color: { name: 'Terracotta', hex: '#E2725B' }, price: 39, originalPrice: 50, discount: 22, isSale: true, isBest: false, isNew: false, query: 'teen girl wearing square neck linen shift dress' },
      { id: 'tn-dr-17', name: 'Teens Cozy Cable Knit Sweater Dress', color: { name: 'Heather Beige', hex: '#F5F5DC' }, price: 49, originalPrice: 65, discount: 25, isSale: true, isBest: true, isNew: true, query: 'teen girl wearing cable knit sweater dress winter aesthetic' },
      { id: 'tn-dr-18', name: 'Teens Strapless Tube Top Bodycon Dress', color: { name: 'Classic Black', hex: '#111111' }, price: 35, originalPrice: 44, discount: 20, isSale: false, isBest: false, isNew: true, query: 'teen girl wearing strapless tube dress black party' },
      { id: 'tn-dr-19', name: 'Teens Ditsy Floral Smocked Cami Dress', color: { name: 'Mint Green Floral', hex: '#98FF98' }, price: 37, originalPrice: 46, discount: 20, isSale: true, isBest: false, isNew: false, query: 'teen girl wearing ditsy floral smocked cami dress' },
      { id: 'tn-dr-20', name: 'Teens Velvet Square Neck Long-Sleeve Dress', color: { name: 'Midnight Navy', hex: '#000080' }, price: 52, originalPrice: 68, discount: 24, isSale: true, isBest: true, isNew: false, query: 'teen girl wearing velvet square neck party dress' }
    ]
  },

  // ===================== TOPS (20) =====================
  {
    category: 'Tops',
    dir: 'tops',
    items: [
      { id: 'tn-tp-01', name: 'Teens Vintage Band Graphic Washed Tee', color: { name: 'Washed Charcoal', hex: '#3E3E3E' }, price: 26, originalPrice: 34, discount: 24, isSale: true, isBest: true, isNew: false, query: 'teen wearing vintage band graphic oversized t-shirt' },
      { id: 'tn-tp-02', name: 'Teens Ribbed Cotton Baby Tee with Contrast Trim', color: { name: 'White & Cherry Red', hex: '#FFFFFF' }, price: 22, originalPrice: 28, discount: 21, isSale: false, isBest: true, isNew: true, query: 'teen girl wearing baby tee cropped t-shirt y2k' },
      { id: 'tn-tp-03', name: 'Teens Crochet Knit Halter Neck Crop Top', color: { name: 'Ivory Cream', hex: '#FFFFF0' }, price: 28, originalPrice: 36, discount: 22, isSale: true, isBest: false, isNew: true, query: 'teen girl wearing crochet halter crop top boho' },
      { id: 'tn-tp-04', name: 'Teens Oversized Boxy Heavyweight Cotton Tee', color: { name: 'Sage Green', hex: '#778877' }, price: 25, originalPrice: 32, discount: 22, isSale: false, isBest: true, isNew: false, query: 'teen wearing oversized boxy t-shirt streetwear plain' },
      { id: 'tn-tp-05', name: 'Teens Striped Long-Sleeve Skater T-Shirt', color: { name: 'Black & White Stripe', hex: '#222222' }, price: 29, originalPrice: 38, discount: 24, isSale: true, isBest: false, isNew: false, query: 'teen wearing striped long sleeve t-shirt skater grunge' },
      { id: 'tn-tp-06', name: 'Teens Sweetheart Neckline Ruched Milkmaid Top', color: { name: 'Dusty Rose', hex: '#C08081' }, price: 30, originalPrice: 38, discount: 21, isSale: true, isBest: true, isNew: false, query: 'teen girl wearing sweetheart milkmaid crop top puff sleeve' },
      { id: 'tn-tp-07', name: 'Teens Seamless Ribbed High-Neck Tank Top', color: { name: 'Chocolate Brown', hex: '#5C4033' }, price: 20, originalPrice: 26, discount: 23, isSale: false, isBest: true, isNew: true, query: 'teen wearing ribbed high neck tank top basic' },
      { id: 'tn-tp-08', name: 'Teens Camp Collar Short-Sleeve Resort Shirt', color: { name: 'Abstract Pastel Print', hex: '#A8DADC' }, price: 34, originalPrice: 44, discount: 23, isSale: true, isBest: false, isNew: false, query: 'teen wearing camp collar short sleeve printed shirt' },
      { id: 'tn-tp-09', name: 'Teens Graphic Motorsport Racing Long-Sleeve Top', color: { name: 'Black & White Moto', hex: '#111111' }, price: 32, originalPrice: 40, discount: 20, isSale: false, isBest: true, isNew: true, query: 'teen wearing motocross racing jersey long sleeve streetwear' },
      { id: 'tn-tp-10', name: 'Teens Off-The-Shoulder Foldover Knit Top', color: { name: 'Charcoal Heather', hex: '#4A4A4A' }, price: 28, originalPrice: 36, discount: 22, isSale: true, isBest: false, isNew: false, query: 'teen girl wearing off shoulder foldover knit top' },
      { id: 'tn-tp-11', name: 'Teens Waffle Knit Thermal Henley Long-Sleeve', color: { name: 'Olive Green', hex: '#556B2F' }, price: 29, originalPrice: 36, discount: 19, isSale: false, isBest: false, isNew: true, query: 'teen wearing waffle thermal henley long sleeve' },
      { id: 'tn-tp-12', name: 'Teens Smocked Bodice Tie-Front Peplum Top', color: { name: 'Floral Lemon', hex: '#FFFACD' }, price: 31, originalPrice: 39, discount: 21, isSale: true, isBest: false, isNew: false, query: 'teen girl wearing smocked peplum tie front floral top' },
      { id: 'tn-tp-13', name: 'Teens Athletic Mesh Number Graphic Jersey Top', color: { name: 'Navy & Red', hex: '#002D62' }, price: 27, originalPrice: 35, discount: 23, isSale: true, isBest: true, isNew: true, query: 'teen wearing athletic basketball jersey t-shirt streetwear' },
      { id: 'tn-tp-14', name: 'Teens Corset Detail Strapless Bandeau Top', color: { name: 'Jet Black', hex: '#0B0B0B' }, price: 26, originalPrice: 34, discount: 24, isSale: false, isBest: false, isNew: true, query: 'teen girl wearing corset tube bandeau top streetwear' },
      { id: 'tn-tp-15', name: 'Teens Retro Polo Collar Striped Knit Tee', color: { name: 'Green & White Stripe', hex: '#2E8B57' }, price: 32, originalPrice: 40, discount: 20, isSale: true, isBest: true, isNew: false, query: 'teen wearing knit polo shirt retro striped aesthetic' },
      { id: 'tn-tp-16', name: 'Teens Butterfly Graphic Fitted Baby Tee', color: { name: 'Lilac Purple', hex: '#B666D2' }, price: 22, originalPrice: 28, discount: 21, isSale: true, isBest: false, isNew: false, query: 'teen girl wearing butterfly graphic baby tee y2k' },
      { id: 'tn-tp-17', name: 'Teens Distressed Grunge Long-Sleeve Layered Tee', color: { name: 'Washed Black & White', hex: '#262626' }, price: 33, originalPrice: 42, discount: 21, isSale: false, isBest: false, isNew: true, query: 'teen wearing double layer grunge skate t-shirt' },
      { id: 'tn-tp-18', name: 'Teens Button-Front Ribbed Short-Sleeve Cardigan', color: { name: 'Baby Blue', hex: '#89CFF0' }, price: 28, originalPrice: 35, discount: 20, isSale: true, isBest: false, isNew: false, query: 'teen girl wearing cropped button up short sleeve cardigan' },
      { id: 'tn-tp-19', name: 'Teens Relaxed Poplin Striped Button-Down Shirt', color: { name: 'Sky Blue Stripe', hex: '#6495ED' }, price: 35, originalPrice: 45, discount: 22, isSale: false, isBest: true, isNew: false, query: 'teen wearing oversized striped button down shirt casual' },
      { id: 'tn-tp-20', name: 'Teens Acid Washed Graphic Skate Pocket Tee', color: { name: 'Mineral Washed Tan', hex: '#D2B48C' }, price: 26, originalPrice: 34, discount: 24, isSale: true, isBest: true, isNew: true, query: 'teen wearing acid wash skate graphic pocket t-shirt' }
    ]
  },

  // ===================== JEANS (20) =====================
  {
    category: 'Jeans',
    dir: 'jeans',
    items: [
      { id: 'tn-jn-01', name: 'Teens Baggy Wide-Leg 90s Vintage Jeans', color: { name: 'Light Bleach Wash', hex: '#9BB7D4' }, price: 46, originalPrice: 60, discount: 23, isSale: true, isBest: true, isNew: false, query: 'teen wearing baggy wide leg jeans 90s streetwear' },
      { id: 'tn-jn-02', name: 'Teens Low-Rise Straight-Leg Blue Denim Jeans', color: { name: 'Classic Medium Blue', hex: '#4B729F' }, price: 44, originalPrice: 55, discount: 20, isSale: false, isBest: true, isNew: true, query: 'teen wearing low rise straight leg denim jeans y2k' },
      { id: 'tn-jn-03', name: 'Teens Multi-Pocket Cargo Carpenter Jeans', color: { name: 'Washed Indigo', hex: '#3B5998' }, price: 50, originalPrice: 65, discount: 23, isSale: true, isBest: true, isNew: false, query: 'teen wearing denim cargo carpenter pants streetwear' },
      { id: 'tn-jn-04', name: 'Teens Distressed Knee-Rip Skater Jeans', color: { name: 'Faded Light Blue', hex: '#87CEEB' }, price: 48, originalPrice: 62, discount: 23, isSale: true, isBest: false, isNew: false, query: 'teen wearing ripped knee distressed baggy skate jeans' },
      { id: 'tn-jn-05', name: 'Teens Two-Tone Panel Wide-Leg Jeans', color: { name: 'Contrast Light & Dark', hex: '#466D88' }, price: 52, originalPrice: 68, discount: 24, isSale: false, isBest: false, isNew: true, query: 'teen wearing two tone patchwork split wide leg jeans' },
      { id: 'tn-jn-06', name: 'Teens High-Waisted Flare Bell-Bottom Jeans', color: { name: 'Dark Wash Denim', hex: '#1C3F60' }, price: 45, originalPrice: 58, discount: 22, isSale: true, isBest: true, isNew: false, query: 'teen wearing high waist flare bell bottom denim jeans' },
      { id: 'tn-jn-07', name: 'Teens Washed Black Denim Baggy Jeans', color: { name: 'Faded Black', hex: '#282828' }, price: 47, originalPrice: 60, discount: 22, isSale: true, isBest: true, isNew: false, query: 'teen wearing washed black loose baggy denim pants' },
      { id: 'tn-jn-08', name: 'Teens Criss-Cross Asymmetrical Waist Jeans', color: { name: 'Vintage Stone Blue', hex: '#5D8AA8' }, price: 49, originalPrice: 64, discount: 23, isSale: false, isBest: true, isNew: true, query: 'teen wearing criss cross waistband straight jeans' },
      { id: 'tn-jn-09', name: 'Teens Raw Hem Cropped Flare Jeans', color: { name: 'Light Blue Wash', hex: '#7BA0CD' }, price: 43, originalPrice: 54, discount: 20, isSale: true, isBest: false, isNew: false, query: 'teen wearing raw hem cropped flare denim jeans' },
      { id: 'tn-jn-10', name: 'Teens Acid Wash Loose Fit Skate Denim', color: { name: 'Acid Marble Wash', hex: '#8C92AC' }, price: 48, originalPrice: 62, discount: 23, isSale: false, isBest: false, isNew: true, query: 'teen wearing acid wash loose skate jeans' },
      { id: 'tn-jn-11', name: 'Teens White Wide-Leg Denim Trousers', color: { name: 'Clean White', hex: '#FDFDFD' }, price: 44, originalPrice: 56, discount: 21, isSale: true, isBest: false, isNew: false, query: 'teen wearing white wide leg denim pants jeans' },
      { id: 'tn-jn-12', name: 'Teens Star Patch Embroidered Relaxed Jeans', color: { name: 'Medium Wash with Stars', hex: '#3E6B89' }, price: 54, originalPrice: 70, discount: 23, isSale: true, isBest: true, isNew: true, query: 'teen wearing star patch embroidered baggy jeans streetwear' },
      { id: 'tn-jn-13', name: 'Teens Mid-Rise Bootcut Classic Blue Jeans', color: { name: 'Heritage Blue', hex: '#315275' }, price: 42, originalPrice: 52, discount: 19, isSale: false, isBest: true, isNew: false, query: 'teen wearing classic bootcut denim jeans blue' },
      { id: 'tn-jn-14', name: 'Teens Side-Slit Hem Straight Denim Jeans', color: { name: 'Washed Indigo', hex: '#4A6984' }, price: 46, originalPrice: 58, discount: 21, isSale: true, isBest: false, isNew: false, query: 'teen wearing side slit hem straight leg jeans' },
      { id: 'tn-jn-15', name: 'Teens Grey Vintage Fade Loose Fit Jeans', color: { name: 'Mineral Grey Wash', hex: '#58595B' }, price: 45, originalPrice: 58, discount: 22, isSale: true, isBest: false, isNew: true, query: 'teen wearing vintage faded grey loose denim jeans' },
      { id: 'tn-jn-16', name: 'Teens Drawstring Elastic Waist Denim Pants', color: { name: 'Light Blue Stone', hex: '#87CEEB' }, price: 40, originalPrice: 50, discount: 20, isSale: false, isBest: false, isNew: false, query: 'teen wearing drawstring elastic waist skate jeans denim' },
      { id: 'tn-jn-17', name: 'Teens Floral Embroidered Vintage Mom Jeans', color: { name: 'Pastel Floral Blue', hex: '#6D9BC3' }, price: 51, originalPrice: 66, discount: 23, isSale: true, isBest: true, isNew: false, query: 'teen wearing floral embroidered denim mom jeans aesthetic' },
      { id: 'tn-jn-18', name: 'Teens Contrast Stitch Dark Indigo Baggy Jeans', color: { name: 'Raw Indigo & White', hex: '#162238' }, price: 48, originalPrice: 62, discount: 23, isSale: false, isBest: false, isNew: true, query: 'teen wearing dark indigo contrast stitch wide jeans' },
      { id: 'tn-jn-19', name: 'Teens Slouchy Boyfriend Fit Ripped Jeans', color: { name: 'Sunbleached Blue', hex: '#94B4D1' }, price: 47, originalPrice: 60, discount: 22, isSale: true, isBest: false, isNew: false, query: 'teen wearing slouchy ripped boyfriend jeans aesthetic' },
      { id: 'tn-jn-20', name: 'Teens Patchwork Multi-Shade Denim Jeans', color: { name: 'Colorblock Denim', hex: '#3E5C76' }, price: 55, originalPrice: 72, discount: 24, isSale: true, isBest: true, isNew: true, query: 'teen wearing patchwork multi tone wide denim jeans' }
    ]
  },

  // ===================== STREETWEAR (20) =====================
  {
    category: 'Streetwear',
    dir: 'streetwear',
    items: [
      { id: 'tn-sw-01', name: 'Teens Baggy Nylon Parachute Cargo Pants', color: { name: 'Steel Grey', hex: '#71797E' }, price: 48, originalPrice: 62, discount: 23, isSale: true, isBest: true, isNew: true, query: 'teen wearing parachute cargo pants streetwear baggy' },
      { id: 'tn-sw-02', name: 'Teens Retro Colorblock Windbreaker Shell Jacket', color: { name: 'Teal & Purple', hex: '#008080' }, price: 52, originalPrice: 68, discount: 24, isSale: true, isBest: true, isNew: false, query: 'teen wearing colorblock 90s windbreaker jacket streetwear' },
      { id: 'tn-sw-03', name: 'Teens Oversized MA-1 Reversible Flight Bomber', color: { name: 'Sage Green', hex: '#556B2F' }, price: 62, originalPrice: 80, discount: 23, isSale: true, isBest: false, isNew: false, query: 'teen wearing oversized bomber jacket streetwear outfit' },
      { id: 'tn-sw-04', name: 'Teens Graphic Print Boxy Streetwear Tee', color: { name: 'Black & Acid Lime', hex: '#1C1C1C' }, price: 28, originalPrice: 36, discount: 22, isSale: false, isBest: true, isNew: true, query: 'teen wearing boxy graphic streetwear t-shirt aesthetic' },
      { id: 'tn-sw-05', name: 'Teens Cyber Utility Multi-Pocket Cargo Shorts', color: { name: 'Matte Khaki', hex: '#8B7D6B' }, price: 40, originalPrice: 50, discount: 20, isSale: true, isBest: false, isNew: false, query: 'teen wearing baggy cargo shorts streetwear outfit' },
      { id: 'tn-sw-06', name: 'Teens Side-Stripe Snap-Button Track Pants', color: { name: 'Navy & White', hex: '#0B1D51' }, price: 42, originalPrice: 54, discount: 22, isSale: false, isBest: true, isNew: false, query: 'teen wearing snap button track pants side stripe streetwear' },
      { id: 'tn-sw-07', name: 'Teens Heavyweight Flannel Plaid Oversized Shacket', color: { name: 'Red & Black Buffalo', hex: '#8B0000' }, price: 46, originalPrice: 60, discount: 23, isSale: true, isBest: false, isNew: true, query: 'teen wearing oversized flannel jacket streetwear grunge' },
      { id: 'tn-sw-08', name: 'Teens Moto Racing Graphic Long-Sleeve Shirt', color: { name: 'Cobalt & White', hex: '#0047AB' }, price: 34, originalPrice: 44, discount: 23, isSale: true, isBest: true, isNew: false, query: 'teen wearing racing motocross jersey long sleeve streetwear' },
      { id: 'tn-sw-09', name: 'Teens Baggy Sweatpants with Raw Hem Cuffs', color: { name: 'Heather Grey', hex: '#808080' }, price: 38, originalPrice: 48, discount: 21, isSale: false, isBest: false, isNew: true, query: 'teen wearing wide leg baggy sweatpants streetwear' },
      { id: 'tn-sw-10', name: 'Teens Tactical Buckle Utility Crossbody Vest', color: { name: 'Jet Black', hex: '#000000' }, price: 44, originalPrice: 58, discount: 24, isSale: true, isBest: false, isNew: false, query: 'teen wearing tactical chest rig vest streetwear outfit' },
      { id: 'tn-sw-11', name: 'Teens Acid Wash Denim Streetwear Overshirt', color: { name: 'Vintage Acid Blue', hex: '#536878' }, price: 49, originalPrice: 64, discount: 23, isSale: false, isBest: true, isNew: false, query: 'teen wearing acid wash denim jacket overshirt streetwear' },
      { id: 'tn-sw-12', name: 'Teens Vintage Japanese Typography Graphic Tee', color: { name: 'Off White Cream', hex: '#FAF0E6' }, price: 29, originalPrice: 38, discount: 24, isSale: true, isBest: true, isNew: true, query: 'teen wearing japanese typography graphic t-shirt streetwear' },
      { id: 'tn-sw-13', name: 'Teens Relaxed Techwear Cargo Track Trousers', color: { name: 'Dark Olive', hex: '#3B443B' }, price: 50, originalPrice: 65, discount: 23, isSale: true, isBest: false, isNew: false, query: 'teen wearing techwear cargo pants streetwear straps' },
      { id: 'tn-sw-14', name: 'Teens Distressed Grunge Striped Knit Pullover', color: { name: 'Black & Red Stripe', hex: '#2A0808' }, price: 42, originalPrice: 55, discount: 24, isSale: false, isBest: false, isNew: true, query: 'teen wearing ripped grunge striped knit sweater streetwear' },
      { id: 'tn-sw-15', name: 'Teens Corduroy Collar Canvas Chore Coat', color: { name: 'Caramel Brown', hex: '#967117' }, price: 58, originalPrice: 75, discount: 23, isSale: true, isBest: true, isNew: false, query: 'teen wearing canvas workwear jacket corduroy collar streetwear' },
      { id: 'tn-sw-16', name: 'Teens Oversized Puffer Vest with High Stand Collar', color: { name: 'Glossy Black', hex: '#1C1C1C' }, price: 48, originalPrice: 62, discount: 23, isSale: true, isBest: false, isNew: true, query: 'teen wearing black oversized puffer vest streetwear' },
      { id: 'tn-sw-17', name: 'Teens Camouflage Print Relaxed Skate Cargo Pants', color: { name: 'Urban Camo', hex: '#4B5320' }, price: 46, originalPrice: 60, discount: 23, isSale: false, isBest: true, isNew: false, query: 'teen wearing camo cargo pants baggy skate streetwear' },
      { id: 'tn-sw-18', name: 'Teens Graphic Half-Zip Anorak Windbreaker', color: { name: 'White & Navy Block', hex: '#EAEAEA' }, price: 50, originalPrice: 64, discount: 22, isSale: true, isBest: false, isNew: false, query: 'teen wearing half zip anorak pullover jacket streetwear' },
      { id: 'tn-sw-19', name: 'Teens Relaxed Fit Carpenter Workwear Trousers', color: { name: 'Raw Natural Canvas', hex: '#E3DAC9' }, price: 44, originalPrice: 56, discount: 21, isSale: true, isBest: false, isNew: true, query: 'teen wearing cream carpenter pants workwear streetwear' },
      { id: 'tn-sw-20', name: 'Teens Flame Graphic Streetwear Cotton Tee', color: { name: 'Washed Black & Orange', hex: '#232020' }, price: 30, originalPrice: 38, discount: 21, isSale: false, isBest: true, isNew: true, query: 'teen wearing flame graphic streetwear t-shirt skate' }
    ]
  },

  // ===================== HOODIES (20) =====================
  {
    category: 'Hoodies',
    dir: 'hoodies',
    items: [
      { id: 'tn-hd-01', name: 'Teens Heavyweight Oversized Boxy Fleece Hoodie', color: { name: 'Oatmeal Heather', hex: '#D7C4B7' }, price: 48, originalPrice: 62, discount: 23, isSale: true, isBest: true, isNew: false, query: 'teen wearing heavyweight boxy fleece hoodie plain aesthetic' },
      { id: 'tn-hd-02', name: 'Teens Full-Zip Y2K Graphic Fleece Hoodie', color: { name: 'Washed Black', hex: '#2B2B2B' }, price: 52, originalPrice: 68, discount: 24, isSale: true, isBest: true, isNew: true, query: 'teen wearing full zip y2k graphic rhinestone hoodie' },
      { id: 'tn-hd-03', name: 'Teens Acid Washed Vintage Pullover Hoodie', color: { name: 'Mineral Washed Grey', hex: '#5A5A5A' }, price: 46, originalPrice: 58, discount: 21, isSale: false, isBest: true, isNew: false, query: 'teen wearing acid wash vintage pullover hoodie streetwear' },
      { id: 'tn-hd-04', name: 'Teens Cropped Raw-Hem Fleece Hoodie', color: { name: 'Baby Pink', hex: '#FFC0CB' }, price: 40, originalPrice: 50, discount: 20, isSale: true, isBest: false, isNew: true, query: 'teen girl wearing cropped raw hem fleece hoodie aesthetic' },
      { id: 'tn-hd-05', name: 'Teens Aesthetic Mountain Landscape Graphic Hoodie', color: { name: 'Forest Green', hex: '#1E4620' }, price: 45, originalPrice: 58, discount: 22, isSale: true, isBest: false, isNew: false, query: 'teen wearing nature mountain graphic green hoodie' },
      { id: 'tn-hd-06', name: 'Teens Thermal Waffle-Lined Zip-Up Winter Hoodie', color: { name: 'Dark Navy', hex: '#0B1D51' }, price: 55, originalPrice: 72, discount: 24, isSale: false, isBest: true, isNew: false, query: 'teen wearing heavyweight zip up winter fleece hoodie' },
      { id: 'tn-hd-07', name: 'Teens Retro University Crest Embroidered Hoodie', color: { name: 'Burgundy Maroon', hex: '#800000' }, price: 48, originalPrice: 62, discount: 23, isSale: true, isBest: true, isNew: true, query: 'teen wearing university crest college embroidered hoodie' },
      { id: 'tn-hd-08', name: 'Teens Drop-Shoulder Relaxed Terry Cotton Hoodie', color: { name: 'Sage Mint', hex: '#87A987' }, price: 44, originalPrice: 56, discount: 21, isSale: false, isBest: false, isNew: false, query: 'teen wearing drop shoulder sage green relaxed hoodie' },
      { id: 'tn-hd-09', name: 'Teens Colorblock Panelled Pullover Hoodie', color: { name: 'Navy & Tan', hex: '#1C2833' }, price: 47, originalPrice: 60, discount: 22, isSale: true, isBest: false, isNew: true, query: 'teen wearing colorblock panelled hoodie aesthetic' },
      { id: 'tn-hd-10', name: 'Teens Skeleton Print Gothic Y2K Zip Hoodie', color: { name: 'Black & Bone White', hex: '#111111' }, price: 54, originalPrice: 70, discount: 23, isSale: true, isBest: true, isNew: false, query: 'teen wearing skeleton print y2k gothic zip hoodie streetwear' },
      { id: 'tn-hd-11', name: 'Teens Minimalist Center-Logo Heavyweight Hoodie', color: { name: 'Cloud White', hex: '#F8F9FA' }, price: 46, originalPrice: 58, discount: 21, isSale: false, isBest: true, isNew: false, query: 'teen wearing minimalist white heavyweight hoodie street' },
      { id: 'tn-hd-12', name: 'Teens Vintage Sun-Faded Pastel Fleece Hoodie', color: { name: 'Dusty Lavender', hex: '#BDBBD7' }, price: 45, originalPrice: 58, discount: 22, isSale: true, isBest: false, isNew: true, query: 'teen wearing pastel lavender washed pullover hoodie' },
      { id: 'tn-hd-13', name: 'Teens Quarter-Zip Polar Fleece Slouchy Hoodie', color: { name: 'Caramel Cream', hex: '#C68B59' }, price: 49, originalPrice: 64, discount: 23, isSale: true, isBest: false, isNew: false, query: 'teen wearing quarter zip polar fleece pullover hoodie' },
      { id: 'tn-hd-14', name: 'Teens Butterfly Graphic Back-Print Hoodie', color: { name: 'Sky Blue', hex: '#87CEEB' }, price: 47, originalPrice: 60, discount: 22, isSale: false, isBest: true, isNew: true, query: 'teen girl wearing butterfly back print oversized hoodie' },
      { id: 'tn-hd-15', name: 'Teens Two-Tone Sleeve Stripe Skater Hoodie', color: { name: 'Black & Gold Stripe', hex: '#212121' }, price: 46, originalPrice: 58, discount: 21, isSale: true, isBest: false, isNew: false, query: 'teen wearing striped sleeve skate pullover hoodie' },
      { id: 'tn-hd-16', name: 'Teens Sherpa-Lined Heavyweight Winter Zip Hoodie', color: { name: 'Chocolate Brown', hex: '#4A2E18' }, price: 58, originalPrice: 75, discount: 23, isSale: true, isBest: true, isNew: false, query: 'teen wearing brown sherpa lined winter zip hoodie' },
      { id: 'tn-hd-17', name: 'Teens Tie-Dye Cloud Wash Relaxed Hoodie', color: { name: 'Pastel Multi Swirl', hex: '#A2D2FF' }, price: 44, originalPrice: 56, discount: 21, isSale: false, isBest: false, isNew: true, query: 'teen wearing pastel tie dye cloud wash hoodie aesthetic' },
      { id: 'tn-hd-18', name: 'Teens Techwear Waterproof Zip-Front Hoodie', color: { name: 'Anthracite Black', hex: '#1B1B1E' }, price: 56, originalPrice: 72, discount: 22, isSale: true, isBest: true, isNew: false, query: 'teen wearing techwear waterproof hooded jacket streetwear' },
      { id: 'tn-hd-19', name: 'Teens Distressed Hem Vintage Wash Pullover', color: { name: 'Olive Drab', hex: '#556B2F' }, price: 45, originalPrice: 58, discount: 22, isSale: false, isBest: false, isNew: true, query: 'teen wearing distressed raw edge olive green hoodie' },
      { id: 'tn-hd-20', name: 'Teens Oversized Fleece Blanket-Weight Hoodie', color: { name: 'Warm Mocha', hex: '#6E4D3E' }, price: 52, originalPrice: 68, discount: 24, isSale: true, isBest: true, isNew: false, query: 'teen wearing ultra oversized blanket fleece warm hoodie' }
    ]
  }
];

async function main() {
  console.log('=== FAMILIA: Building Teens Catalog (120 Unique Products) ===\n');

  const verifiedProducts = [];

  for (const catGroup of TEENS_CATALOG_DEF) {
    console.log(`\n=== Processing Category: ${catGroup.category} (20 items) ===`);
    const catDir = path.join('public/assets/teens', catGroup.dir);
    if (!fs.existsSync(catDir)) fs.mkdirSync(catDir, { recursive: true });

    let index = 0;
    for (const item of catGroup.items) {
      index++;
      const targetFilename = `${item.id}.jpg`;
      const targetAbsPath = path.join(catDir, targetFilename);
      const targetRelPath = `/assets/teens/${catGroup.dir}/${targetFilename}`;

      console.log(`[${catGroup.category} ${index}/20] Downloading: ${item.name} ...`);

      let imageSaved = false;
      const res = await searchImage(item.query);
      if (res && res.buffer) {
        const rawPath = `/tmp/raw_${item.id}.jpg`;
        fs.writeFileSync(rawPath, res.buffer);
        try {
          execSync(`convert ${rawPath} -auto-orient -gravity Center -crop 4:5 +repage -resize 600x750\\^ -extent 600x750 -quality 85 ${targetAbsPath}`);
          const stats = fs.statSync(targetAbsPath);
          if (stats.size > 2000) {
            imageSaved = true;
            console.log(`  -> Successfully saved ${targetRelPath} (${stats.size} bytes)`);
          }
        } catch (e) {
          console.warn(`  -> ImageMagick error for ${item.id}:`, e.message);
        }
      }

      if (!imageSaved) {
        console.warn(`  -> Fallback image for ${item.id}`);
        const fallbackUrl = 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?q=80&w=800&auto=format&fit=crop';
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
      if (catGroup.category === 'Hoodies') subcats.push('Casualwear', 'Streetwear');
      if (catGroup.category === 'Streetwear') subcats.push('Casualwear');

      const colorList = [
        item.color,
        { name: 'Heather Grey', hex: '#A8A9AD' },
        { name: 'Vintage Black', hex: '#222222' }
      ];

      const product = {
        id: item.id,
        name: item.name,
        slug: slug,
        category: 'teens',
        subcategory: catGroup.category,
        subcategories: subcats,
        price: item.price,
        originalPrice: item.originalPrice,
        discountPercentage: item.discount,
        rating: +(4.6 + Math.random() * 0.3).toFixed(1),
        reviewsCount: Math.floor(45 + Math.random() * 110),
        isNew: item.isNew,
        isSale: item.isSale,
        isBestSeller: item.isBest,
        colors: colorList,
        sizes: ['XS', 'S', 'M', 'L', 'XL'],
        description: `Trendy ${item.name.toLowerCase()} featuring relaxed streetwear proportions, durable cotton-blend construction, and signature FAMILIA youth styling.`,
        details: [
          'High-density breathable cotton blend with premium soft handfeel',
          'Reinforced flatlock stitching and pre-shrunk fabric for lasting wear',
          'Relaxed unisex streetwear silhouette designed for everyday layering',
          'Custom FAMILIA youth hardware and woven authenticity label'
        ],
        fabricCare: [
          'Machine wash cold with like colors inside out',
          'Tumble dry low or hang dry for best fabric longevity',
          'Cool iron on reverse side; avoid direct heat on graphics'
        ],
        images: [targetRelPath],
        inStock: true,
        sku: `FAM-TN-${catGroup.dir.toUpperCase().substring(0, 3)}-${item.id.replace('tn-', '').toUpperCase()}`,
        tags: [
          'teens',
          'streetwear',
          catGroup.category.toLowerCase().replace(/\s+/g, '-'),
          ...item.name.toLowerCase().split(' ').filter(w => w.length > 3)
        ]
      };

      verifiedProducts.push(product);
    }
  }

  // Write TypeScript file src/data/teensProducts.ts
  const fileContent = `import { Product } from '../types';\n\nexport const TEENS_PRODUCTS: Product[] = ${JSON.stringify(verifiedProducts, null, 2)};\n`;
  fs.writeFileSync('src/data/teensProducts.ts', fileContent, 'utf8');
  console.log(`\nSuccessfully wrote ${verifiedProducts.length} verified products to src/data/teensProducts.ts`);

  // Generate montages for each category
  console.log('\nGenerating visual verification montages for all 6 Teens categories...');
  for (const catGroup of TEENS_CATALOG_DEF) {
    const imgList = verifiedProducts
      .filter(p => p.subcategory === catGroup.category)
      .map(p => `public${p.images[0]}`);

    const montageTarget = `public/montage_tn_${catGroup.dir}.jpg`;
    try {
      execSync(`montage ${imgList.join(' ')} -tile 5x4 -geometry 240x300+4+4 -title "Teens ${catGroup.category} 1 to 20" ${montageTarget}`);
      console.log(`  -> Generated ${montageTarget}`);
    } catch (e) {
      console.error(`  -> Error generating montage for ${catGroup.category}:`, e.message);
    }
  }

  console.log('\nTeens catalog build complete!');
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
