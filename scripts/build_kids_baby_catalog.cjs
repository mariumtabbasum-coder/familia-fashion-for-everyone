const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const { searchImage } = require('./fetch_catalog.cjs');

const KIDS_BABY_CATALOG_DEF = [
  // ===================== BOYS (20) =====================
  {
    category: 'Boys',
    dir: 'boys',
    items: [
      { id: 'kb-by-01', name: 'Boys Washed Linen Short-Sleeve Resort Shirt', color: { name: 'Sage Mint', hex: '#87A892' }, price: 26, originalPrice: 34, discount: 23, isSale: true, isBest: true, isNew: false, query: 'little boy wearing linen shirt button down summer studio model kids' },
      { id: 'kb-by-02', name: 'Boys Cotton Chino Elastic-Waist Shorts', color: { name: 'Khaki Tan', hex: '#C2A379' }, price: 22, originalPrice: 28, discount: 21, isSale: false, isBest: true, isNew: false, query: 'boy wearing khaki chino shorts studio model kids fashion' },
      { id: 'kb-by-03', name: 'Boys Striped Oxford Button-Down Casual Shirt', color: { name: 'Sky Blue Stripe', hex: '#82A7CA' }, price: 28, originalPrice: 35, discount: 20, isSale: true, isBest: false, isNew: true, query: 'boy wearing blue striped oxford shirt studio model kids' },
      { id: 'kb-by-04', name: 'Boys Denim Straight-Leg Stretch Jeans', color: { name: 'Medium Blue Wash', hex: '#4A6B8F' }, price: 32, originalPrice: 40, discount: 20, isSale: false, isBest: true, isNew: false, query: 'boy wearing denim jeans studio model kids fashion' },
      { id: 'kb-by-05', name: 'Boys Pique Cotton Polo Shirt with Collar', color: { name: 'Navy Blue', hex: '#16233B' }, price: 24, originalPrice: 30, discount: 20, isSale: true, isBest: false, isNew: false, query: 'boy wearing navy polo shirt studio model kids fashion' },
      { id: 'kb-by-06', name: 'Boys Fleece Zip-Up Hoodie Sweatshirt', color: { name: 'Heather Grey', hex: '#9E9EA2' }, price: 34, originalPrice: 44, discount: 22, isSale: true, isBest: true, isNew: false, query: 'boy wearing grey fleece zip hoodie studio model kids' },
      { id: 'kb-by-07', name: 'Boys Cargo Pocket Twill Shorts', color: { name: 'Olive Green', hex: '#4F5E45' }, price: 24, originalPrice: 30, discount: 20, isSale: false, isBest: false, isNew: true, query: 'boy wearing olive cargo shorts studio model kids fashion' },
      { id: 'kb-by-08', name: 'Boys Cable Knit Crewneck Pullover Sweater', color: { name: 'Oatmeal Cream', hex: '#DDD4C4' }, price: 36, originalPrice: 48, discount: 25, isSale: true, isBest: false, isNew: false, query: 'boy wearing cream cable knit sweater studio model kids' },
      { id: 'kb-by-09', name: 'Boys Nautical Breton Striped Long-Sleeve Top', color: { name: 'Navy & White Stripe', hex: '#1A2944' }, price: 25, originalPrice: 32, discount: 21, isSale: false, isBest: true, isNew: true, query: 'boy wearing striped breton long sleeve shirt studio model kids' },
      { id: 'kb-by-10', name: 'Boys Corduroy Button-Front Casual Overshirt', color: { name: 'Caramel Tan', hex: '#A87143' }, price: 35, originalPrice: 45, discount: 22, isSale: true, isBest: false, isNew: false, query: 'boy wearing corduroy shirt overshirt jacket studio model kids' },
      { id: 'kb-by-11', name: 'Boys Breathable Mesh Athletic Running Shorts', color: { name: 'Cobalt Blue', hex: '#1A53B5' }, price: 19, originalPrice: 25, discount: 24, isSale: true, isBest: false, isNew: true, query: 'boy wearing athletic running shorts gym studio model kids' },
      { id: 'kb-by-12', name: 'Boys Denim Sherpa-Lined Winter Jacket', color: { name: 'Washed Blue Denim', hex: '#4C6E94' }, price: 48, originalPrice: 62, discount: 22, isSale: true, isBest: true, isNew: false, query: 'boy wearing sherpa lined denim jacket trucker studio model kids' },
      { id: 'kb-by-13', name: 'Boys Drawstring Linen Blend Summer Trousers', color: { name: 'Natural Sand', hex: '#DED5C4' }, price: 28, originalPrice: 35, discount: 20, isSale: false, isBest: false, isNew: true, query: 'boy wearing linen drawstring pants trousers summer studio model kids' },
      { id: 'kb-by-14', name: 'Boys Graphic Outdoor Adventure Explorer Tee', color: { name: 'Forest Green', hex: '#2A4638' }, price: 20, originalPrice: 26, discount: 23, isSale: true, isBest: true, isNew: false, query: 'boy wearing graphic t shirt adventure green studio model kids' },
      { id: 'kb-by-15', name: 'Boys Colorblock Windbreaker Lightweight Jacket', color: { name: 'Teal & Navy', hex: '#1C7285' }, price: 38, originalPrice: 48, discount: 20, isSale: false, isBest: false, isNew: true, query: 'boy wearing windbreaker hooded jacket lightweight studio model kids' },
      { id: 'kb-by-16', name: 'Boys Quilted Puffer Vest with Snap Front', color: { name: 'Mustard Yellow', hex: '#D4AF37' }, price: 32, originalPrice: 42, discount: 23, isSale: true, isBest: false, isNew: false, query: 'boy wearing quilted puffer vest gilet yellow studio model kids' },
      { id: 'kb-by-17', name: 'Boys French Terry Relaxed Jogger Pants', color: { name: 'Charcoal Grey', hex: '#3C4047' }, price: 26, originalPrice: 32, discount: 18, isSale: false, isBest: true, isNew: false, query: 'boy wearing sweatpants joggers sweat pants studio model kids' },
      { id: 'kb-by-18', name: 'Boys Tartan Plaid Flannel Long-Sleeve Shirt', color: { name: 'Red & Navy Plaid', hex: '#94222D' }, price: 30, originalPrice: 38, discount: 21, isSale: true, isBest: false, isNew: false, query: 'boy wearing red plaid flannel shirt studio model kids' },
      { id: 'kb-by-19', name: 'Boys Short-Sleeve Henley Button Tee', color: { name: 'Terracotta Rust', hex: '#BA5D43' }, price: 22, originalPrice: 28, discount: 21, isSale: false, isBest: false, isNew: true, query: 'boy wearing henley t shirt short sleeve studio model kids' },
      { id: 'kb-by-20', name: 'Boys Tailored Formal Blazer Jacket', color: { name: 'Midnight Navy', hex: '#141E30' }, price: 54, originalPrice: 70, discount: 22, isSale: true, isBest: true, isNew: true, query: 'boy wearing navy blue blazer suit jacket formal studio model kids' }
    ]
  },

  // ===================== GIRLS (20) =====================
  {
    category: 'Girls',
    dir: 'girls',
    items: [
      { id: 'kb-gl-01', name: 'Girls Floral Tiered Cotton Ruffle Sundress', color: { name: 'Blush Floral', hex: '#DFB8C0' }, price: 32, originalPrice: 42, discount: 23, isSale: true, isBest: true, isNew: false, query: 'little girl wearing floral tiered summer dress studio model kids' },
      { id: 'kb-gl-02', name: 'Girls Broderie Anglaise Eyelet Puff-Sleeve Blouse', color: { name: 'Pure White', hex: '#FFFFFF' }, price: 26, originalPrice: 32, discount: 18, isSale: false, isBest: true, isNew: true, query: 'little girl wearing white eyelet broderie blouse studio model kids' },
      { id: 'kb-gl-03', name: 'Girls Ribbed Knit Cardigan Sweater with Scallop Trim', color: { name: 'Pastel Lilac', hex: '#C8A2C8' }, price: 30, originalPrice: 38, discount: 21, isSale: true, isBest: false, isNew: false, query: 'little girl wearing knit cardigan sweater lilac studio model kids' },
      { id: 'kb-gl-04', name: 'Girls Pleated Twill School & Party Skirt', color: { name: 'Navy Blue', hex: '#16233B' }, price: 24, originalPrice: 30, discount: 20, isSale: false, isBest: true, isNew: false, query: 'little girl wearing pleated skirt navy blue studio model kids' },
      { id: 'kb-gl-05', name: 'Girls Embroidered Daisy Chambray Pinafore Dress', color: { name: 'Light Blue Denim', hex: '#8BA9C4' }, price: 34, originalPrice: 44, discount: 22, isSale: true, isBest: false, isNew: true, query: 'girl wearing denim pinafore dress overalls studio model kids' },
      { id: 'kb-gl-06', name: 'Girls Flutter-Sleeve Organic Cotton Top', color: { name: 'Lemon Yellow', hex: '#FFF44F' }, price: 20, originalPrice: 26, discount: 23, isSale: false, isBest: false, isNew: true, query: 'girl wearing flutter sleeve t-shirt yellow studio model kids' },
      { id: 'kb-gl-07', name: 'Girls Cozy Cable Knit Pom-Pom Winter Sweater', color: { name: 'Dusty Rose', hex: '#D29CA6' }, price: 38, originalPrice: 50, discount: 24, isSale: true, isBest: true, isNew: false, query: 'little girl wearing pink cable knit sweater winter studio model kids' },
      { id: 'kb-gl-08', name: 'Girls Stretch Denim Skinny Jeans with Elastic Waist', color: { name: 'Mid Indigo', hex: '#4A6984' }, price: 29, originalPrice: 36, discount: 19, isSale: false, isBest: true, isNew: false, query: 'little girl wearing denim jeans blue studio model kids fashion' },
      { id: 'kb-gl-09', name: 'Girls Smocked Bodice Floral Ditsy Blouse', color: { name: 'Coral Pink', hex: '#F88379' }, price: 25, originalPrice: 32, discount: 21, isSale: true, isBest: false, isNew: false, query: 'girl wearing smocked floral blouse shirt studio model kids' },
      { id: 'kb-gl-10', name: 'Girls Tulle Layered Ballet Tutu Skirt', color: { name: 'Soft Pink', hex: '#FADADD' }, price: 27, originalPrice: 35, discount: 22, isSale: false, isBest: true, isNew: true, query: 'little girl wearing pink tulle tutu skirt ballet studio model kids' },
      { id: 'kb-gl-11', name: 'Girls Gingham Check Cotton Apron Dress', color: { name: 'Sage Green Gingham', hex: '#879782' }, price: 33, originalPrice: 42, discount: 21, isSale: true, isBest: false, isNew: false, query: 'girl wearing gingham check dress green studio model kids' },
      { id: 'kb-gl-12', name: 'Girls Ribbed Flared Leggings with Lettuce Edge Hem', color: { name: 'Heather Grey', hex: '#9E9FA5' }, price: 22, originalPrice: 28, discount: 21, isSale: false, isBest: true, isNew: true, query: 'girl wearing ribbed flare leggings pants studio model kids' },
      { id: 'kb-gl-13', name: 'Girls Quilted Floral Reversible Spring Jacket', color: { name: 'Cream Floral', hex: '#FFF5EE' }, price: 44, originalPrice: 58, discount: 24, isSale: true, isBest: false, isNew: true, query: 'little girl wearing quilted floral jacket coat studio model kids' },
      { id: 'kb-gl-14', name: 'Girls French Terry Bow-Detail Pullover Sweatshirt', color: { name: 'Vanilla Cream', hex: '#EDE6D4' }, price: 28, originalPrice: 35, discount: 20, isSale: false, isBest: false, isNew: false, query: 'girl wearing cute sweatshirt pullover studio model kids' },
      { id: 'kb-gl-15', name: 'Girls Cotton Poplin Peter Pan Collar Blouse', color: { name: 'Soft Sky Blue', hex: '#A7C7E7' }, price: 26, originalPrice: 34, discount: 23, isSale: true, isBest: false, isNew: false, query: 'girl wearing peter pan collar blouse shirt studio model kids' },
      { id: 'kb-gl-16', name: 'Girls Corduroy Overall Dungaree Dress', color: { name: 'Warm Cinnamon', hex: '#9E6A3F' }, price: 35, originalPrice: 45, discount: 22, isSale: false, isBest: true, isNew: true, query: 'girl wearing corduroy overall pinafore dress studio model kids' },
      { id: 'kb-gl-17', name: 'Girls Pointelle Knit Long-Sleeve Top', color: { name: 'Antique White', hex: '#FAF9F6' }, price: 23, originalPrice: 29, discount: 20, isSale: true, isBest: false, isNew: false, query: 'girl wearing pointelle knit long sleeve top studio model kids' },
      { id: 'kb-gl-18', name: 'Girls Ruffled Hem Linen Summer Shorts', color: { name: 'Muted Rose', hex: '#C28F97' }, price: 21, originalPrice: 26, discount: 19, isSale: false, isBest: false, isNew: true, query: 'girl wearing ruffle linen shorts studio model kids' },
      { id: 'kb-gl-19', name: 'Girls Faux-Fur Trim Hooded Winter Coat', color: { name: 'Almond Beige', hex: '#DECBB6' }, price: 58, originalPrice: 78, discount: 25, isSale: true, isBest: true, isNew: false, query: 'little girl wearing winter coat fur hood parka studio model kids' },
      { id: 'kb-gl-20', name: 'Girls Sweetheart Eyelet Tiered Party Dress', color: { name: 'Sky Pastel Blue', hex: '#96C5D7' }, price: 39, originalPrice: 50, discount: 22, isSale: false, isBest: true, isNew: true, query: 'little girl wearing pastel blue party dress elegant studio model kids' }
    ]
  },

  // ===================== CLOTHING SETS (20) =====================
  {
    category: 'Clothing Sets',
    dir: 'clothing-sets',
    items: [
      { id: 'kb-cs-01', name: 'Toddler Boy Linen Button Shirt & Chino Shorts Set', color: { name: 'Natural Sand & Khaki', hex: '#CDBCA9' }, price: 38, originalPrice: 50, discount: 24, isSale: true, isBest: true, isNew: true, query: 'toddler boy linen shirt and shorts matching set kids clothes' },
      { id: 'kb-cs-02', name: 'Baby Girl Floral Ruffle Top & Bloomer Set', color: { name: 'Blush Floral', hex: '#E8C5C8' }, price: 29, originalPrice: 38, discount: 23, isSale: true, isBest: true, isNew: false, query: 'baby girl floral top and bloomer matching set studio model' },
      { id: 'kb-cs-03', name: 'Kids French Terry Sweatshirt & Joggers Tracksuit Set', color: { name: 'Sage Green Melange', hex: '#7E917A' }, price: 42, originalPrice: 55, discount: 23, isSale: true, isBest: false, isNew: true, query: 'toddler kids matching sweatshirt and sweatpants tracksuit set' },
      { id: 'kb-cs-04', name: 'Baby Ribbed Cotton Long-Sleeve Top & Pants Set', color: { name: 'Oatmeal Cream', hex: '#E6DFC8' }, price: 32, originalPrice: 40, discount: 20, isSale: false, isBest: true, isNew: false, query: 'baby ribbed knit top and pants set lounge matching two piece' },
      { id: 'kb-cs-05', name: 'Toddler Girl Peplum Blouse & Floral Leggings Set', color: { name: 'Dusty Rose', hex: '#BF7C87' }, price: 34, originalPrice: 44, discount: 22, isSale: true, isBest: false, isNew: true, query: 'toddler girl peplum top and leggings matching outfit set' },
      { id: 'kb-cs-06', name: 'Boys Striped Tee & Twill Cargo Shorts Two-Piece Set', color: { name: 'Navy & White', hex: '#1B263B' }, price: 35, originalPrice: 45, discount: 22, isSale: false, isBest: true, isNew: false, query: 'boy striped t-shirt and cargo shorts two piece outfit set kids' },
      { id: 'kb-cs-07', name: 'Baby Waffle Knit Cardigan & Footed Pants Duo', color: { name: 'Warm Moka', hex: '#87695B' }, price: 36, originalPrice: 46, discount: 21, isSale: true, isBest: false, isNew: false, query: 'baby waffle cardigan and pants matching outfit set' },
      { id: 'kb-cs-08', name: 'Kids Summer Terry Towelling Polo & Shorts Set', color: { name: 'Sky Blue', hex: '#76A5AF' }, price: 38, originalPrice: 48, discount: 20, isSale: false, isBest: false, isNew: true, query: 'kids terry towel polo shirt and shorts matching set summer' },
      { id: 'kb-cs-09', name: 'Toddler Girl Broderie Top & Tiered Skirt Set', color: { name: 'Buttercream White', hex: '#FAF9F6' }, price: 36, originalPrice: 46, discount: 21, isSale: true, isBest: true, isNew: false, query: 'toddler girl white eyelet top and skirt outfit set kids' },
      { id: 'kb-cs-10', name: 'Boys Oxford Shirt & Suspenders Trouser Formal Set', color: { name: 'White & Navy', hex: '#141E30' }, price: 46, originalPrice: 60, discount: 23, isSale: true, isBest: false, isNew: true, query: 'toddler boy shirt suspenders and trousers formal outfit set' },
      { id: 'kb-cs-11', name: 'Baby Knitted Sweater & Bloomers Set', color: { name: 'Soft Terracotta', hex: '#CC4E33' }, price: 34, originalPrice: 42, discount: 19, isSale: false, isBest: true, isNew: false, query: 'baby knit sweater and bloomers shorts set outfit' },
      { id: 'kb-cs-12', name: 'Toddler Organic Cotton Cami Top & Biker Shorts Set', color: { name: 'Lilac Mist', hex: '#B5A5C7' }, price: 26, originalPrice: 32, discount: 18, isSale: true, isBest: false, isNew: true, query: 'toddler girl cami top and biker shorts matching set summer' },
      { id: 'kb-cs-13', name: 'Kids Colorblock Track Jacket & Pant Set', color: { name: 'Navy & Teal', hex: '#1C7285' }, price: 45, originalPrice: 58, discount: 22, isSale: true, isBest: false, isNew: false, query: 'kids track jacket and pants athletic set tracksuit' },
      { id: 'kb-cs-14', name: 'Baby Girl Smocked Top & Polka Dot Shorts Set', color: { name: 'Mustard & White', hex: '#E3A824' }, price: 30, originalPrice: 38, discount: 21, isSale: false, isBest: false, isNew: true, query: 'baby girl smocked top and shorts set yellow' },
      { id: 'kb-cs-15', name: 'Toddler Boy Dinosaur Graphic Tee & Shorts Set', color: { name: 'Olive & Charcoal', hex: '#4A553E' }, price: 28, originalPrice: 35, discount: 20, isSale: true, isBest: true, isNew: false, query: 'toddler boy graphic tee and shorts outfit set kids' },
      { id: 'kb-cs-16', name: 'Baby Pointelle Long-Sleeve Wrap Top & Leggings Duo', color: { name: 'Cloud White', hex: '#F8F9FA' }, price: 31, originalPrice: 38, discount: 18, isSale: false, isBest: false, isNew: false, query: 'baby pointelle wrap top and leggings matching outfit set' },
      { id: 'kb-cs-17', name: 'Kids Cozy Velour Zip Hoodie & Sweatpants Set', color: { name: 'Dusty Mauve', hex: '#A37E8C' }, price: 44, originalPrice: 56, discount: 21, isSale: true, isBest: true, isNew: true, query: 'kids velour hoodie and pants tracksuit set' },
      { id: 'kb-cs-18', name: 'Boys Camp Collar Floral Shirt & Chino Shorts Resort Set', color: { name: 'Peach & Cream', hex: '#DECBB6' }, price: 39, originalPrice: 50, discount: 22, isSale: false, isBest: false, isNew: true, query: 'toddler boy resort floral shirt and shorts set summer kids' },
      { id: 'kb-cs-19', name: 'Toddler Girl Ruffle Tank & Wide-Leg Linen Pant Set', color: { name: 'Sage Floral', hex: '#8A9B85' }, price: 35, originalPrice: 45, discount: 22, isSale: true, isBest: false, isNew: false, query: 'toddler girl linen ruffle top and wide pants outfit set' },
      { id: 'kb-cs-20', name: 'Kids Active Performance Tee & Running Shorts Duo', color: { name: 'Cobalt Blue & Grey', hex: '#2155CD' }, price: 30, originalPrice: 38, discount: 21, isSale: false, isBest: true, isNew: true, query: 'kids athletic t-shirt and shorts workout set activewear' }
    ]
  },

  // ===================== NEWBORN (20) =====================
  {
    category: 'Newborn',
    dir: 'newborn',
    items: [
      { id: 'kb-nb-01', name: 'Newborn Kimono Wrap Long-Sleeve Bodysuit', color: { name: 'Pure White', hex: '#FFFFFF' }, price: 18, originalPrice: 24, discount: 25, isSale: true, isBest: true, isNew: false, query: 'newborn kimono wrap bodysuit organic cotton baby' },
      { id: 'kb-nb-02', name: 'Newborn 100% Cotton Ribbed Footed Sleepsuit', color: { name: 'Soft Oat Heather', hex: '#DDD4C4' }, price: 24, originalPrice: 30, discount: 20, isSale: false, isBest: true, isNew: false, query: 'newborn ribbed footed sleepsuit onesie baby sleeper' },
      { id: 'kb-nb-03', name: 'Newborn Muslin Swaddle Blanket & Knotted Beanie Set', color: { name: 'Sage Botanical', hex: '#77997A' }, price: 26, originalPrice: 34, discount: 23, isSale: true, isBest: true, isNew: true, query: 'newborn swaddle blanket and knotted hat beanie set baby' },
      { id: 'kb-nb-04', name: 'Newborn Pointelle Knit Cardigan & Bonnet Set', color: { name: 'Vanilla Cream', hex: '#F0EBD8' }, price: 32, originalPrice: 40, discount: 20, isSale: false, isBest: false, isNew: true, query: 'newborn baby knit cardigan and bonnet hat set' },
      { id: 'kb-nb-05', name: 'Newborn Organic Cotton Cross-Front Onesie', color: { name: 'Pale Mint', hex: '#B8DED0' }, price: 19, originalPrice: 25, discount: 24, isSale: true, isBest: false, isNew: false, query: 'newborn organic cotton crossover onesie bodysuit' },
      { id: 'kb-nb-06', name: 'Newborn Soft Ribbed Footless Romper with Two-Way Zipper', color: { name: 'Dusty Lilac', hex: '#C8A2C8' }, price: 25, originalPrice: 32, discount: 21, isSale: false, isBest: true, isNew: false, query: 'newborn two way zip ribbed romper baby sleeper' },
      { id: 'kb-nb-07', name: 'Newborn GOTS Organic Cotton Welcome Home Set', color: { name: 'Cloud Grey', hex: '#AEB1B8' }, price: 39, originalPrice: 50, discount: 22, isSale: true, isBest: true, isNew: true, query: 'newborn take me home outfit set organic cotton baby' },
      { id: 'kb-nb-08', name: 'Newborn Muslin Ruffle Sleep Gown with Elastic Bottom', color: { name: 'Blush Pink', hex: '#ECC4CD' }, price: 22, originalPrice: 28, discount: 21, isSale: false, isBest: false, isNew: false, query: 'newborn baby sleeper gown elastic bottom knotted baby' },
      { id: 'kb-nb-09', name: 'Newborn Chunky Hand-Knit Booties & Mittens Duo', color: { name: 'Warm Almond', hex: '#CBB295' }, price: 18, originalPrice: 22, discount: 18, isSale: true, isBest: false, isNew: true, query: 'newborn knit baby booties and mittens set' },
      { id: 'kb-nb-10', name: 'Newborn Cotton Receiving Gown with Fold-Over Mitts', color: { name: 'Sky Blue', hex: '#A7C7E7' }, price: 21, originalPrice: 26, discount: 19, isSale: false, isBest: false, isNew: false, query: 'newborn knotted gown baby sleep sack fold over mittens' },
      { id: 'kb-nb-11', name: 'Newborn Cellular Breathable Cotton Crib Blanket', color: { name: 'Natural Cream', hex: '#FAF7EE' }, price: 28, originalPrice: 35, discount: 20, isSale: true, isBest: true, isNew: false, query: 'newborn cellular blanket baby cotton crib pram' },
      { id: 'kb-nb-12', name: 'Newborn Ribbed Henley Footed Sleeper', color: { name: 'Muted Terracotta', hex: '#CC4E33' }, price: 26, originalPrice: 32, discount: 18, isSale: false, isBest: false, isNew: true, query: 'newborn ribbed henley footed onesie baby sleeper' },
      { id: 'kb-nb-13', name: 'Newborn Organic Cotton Kimono Top & Footed Pant Set', color: { name: 'Butter Yellow', hex: '#FFE599' }, price: 29, originalPrice: 38, discount: 23, isSale: true, isBest: false, isNew: false, query: 'newborn kimono top and pants set baby organic' },
      { id: 'kb-nb-14', name: 'Newborn Muslin Bandana Teething Bibs 3-Pack', color: { name: 'Neutral Earth Tones', hex: '#D5C4A1' }, price: 16, originalPrice: 20, discount: 20, isSale: false, isBest: true, isNew: false, query: 'newborn muslin baby bandana bibs 3 pack' },
      { id: 'kb-nb-15', name: 'Newborn Chunky Wool Cable Knit Pram Suit', color: { name: 'Soft Biscuit', hex: '#D8C7B5' }, price: 48, originalPrice: 65, discount: 26, isSale: true, isBest: true, isNew: true, query: 'newborn knit pram suit baby hooded romper winter' },
      { id: 'kb-nb-16', name: 'Newborn Floral Print Knot Gown & Headband Set', color: { name: 'Vintage Rose', hex: '#E8CCD7' }, price: 24, originalPrice: 30, discount: 20, isSale: false, isBest: false, isNew: false, query: 'newborn knotted gown headband set floral baby' },
      { id: 'kb-nb-17', name: 'Newborn Pure Pima Cotton Peter Pan Collar Sleepsuit', color: { name: 'Bright White', hex: '#FFFFFF' }, price: 34, originalPrice: 42, discount: 19, isSale: true, isBest: false, isNew: true, query: 'newborn peter pan collar footed sleepsuit pima cotton' },
      { id: 'kb-nb-18', name: 'Newborn Waffle Knit Romper with Coconut Buttons', color: { name: 'Warm Caramel', hex: '#BD9165' }, price: 27, originalPrice: 35, discount: 22, isSale: false, isBest: true, isNew: false, query: 'newborn waffle knit romper onesie baby sleeper' },
      { id: 'kb-nb-19', name: 'Newborn Gentle Non-Slip Cotton Socks 4-Pack', color: { name: 'Pastel Palette', hex: '#E2DFD8' }, price: 14, originalPrice: 18, discount: 22, isSale: true, isBest: false, isNew: false, query: 'newborn baby socks cotton pastel soft pack' },
      { id: 'kb-nb-20', name: 'Newborn Quilted Organic Jersey Sleeping Bag', color: { name: 'Sage Star Print', hex: '#879782' }, price: 36, originalPrice: 48, discount: 25, isSale: true, isBest: true, isNew: true, query: 'baby sleep sack sleeping bag newborn wearable blanket' }
    ]
  },

  // ===================== ROMPERS (20) =====================
  {
    category: 'Rompers',
    dir: 'rompers',
    items: [
      { id: 'kb-rm-01', name: 'Baby Linen-Cotton Button-Front Short-Sleeve Romper', color: { name: 'Natural Sand', hex: '#DED5C4' }, price: 27, originalPrice: 35, discount: 22, isSale: true, isBest: true, isNew: true, query: 'baby linen romper button front short sleeve summer onesie' },
      { id: 'kb-rm-02', name: 'Baby Girl Floral Eyelet Ruffle Bubble Romper', color: { name: 'Blush Pink', hex: '#FADADD' }, price: 29, originalPrice: 38, discount: 23, isSale: false, isBest: true, isNew: false, query: 'baby girl floral bubble romper ruffle summer' },
      { id: 'kb-rm-03', name: 'Baby Boy Striped Ribbed Cotton Dungaree Romper', color: { name: 'Navy & Ecru', hex: '#1B263B' }, price: 26, originalPrice: 32, discount: 18, isSale: true, isBest: false, isNew: false, query: 'baby boy striped dungaree romper overalls onesie' },
      { id: 'kb-rm-04', name: 'Baby Waffle Knit Long-Sleeve Hooded Jumpsuit Romper', color: { name: 'Muted Olive', hex: '#4F5E45' }, price: 34, originalPrice: 44, discount: 22, isSale: true, isBest: true, isNew: true, query: 'baby waffle knit hooded romper jumpsuit onesie' },
      { id: 'kb-rm-05', name: 'Toddler Crinkled Cotton Overalls with Pocket', color: { name: 'Warm Terracotta', hex: '#C86D51' }, price: 30, originalPrice: 38, discount: 21, isSale: false, isBest: false, isNew: true, query: 'toddler cotton overalls dungarees romper kids' },
      { id: 'kb-rm-06', name: 'Baby Ribbed Two-Way Zip Everyday Play Romper', color: { name: 'Sage Green', hex: '#778873' }, price: 25, originalPrice: 32, discount: 21, isSale: true, isBest: true, isNew: false, query: 'baby ribbed zip romper onesie footless sleeper' },
      { id: 'kb-rm-07', name: 'Baby Girl Smocked Bodice Sleeveless Sun Romper', color: { name: 'Dusty Rose Floral', hex: '#C08081' }, price: 28, originalPrice: 35, discount: 20, isSale: false, isBest: false, isNew: true, query: 'baby girl smocked sun romper floral summer' },
      { id: 'kb-rm-08', name: 'Baby Boy Chambray Denim Suspender Dungaree Romper', color: { name: 'Indigo Blue', hex: '#587A9E' }, price: 32, originalPrice: 40, discount: 20, isSale: true, isBest: false, isNew: false, query: 'baby boy denim overalls dungaree romper chambray' },
      { id: 'kb-rm-09', name: 'Baby Fine-Knit Cotton Sleeveless Summer Playsuit', color: { name: 'Butter Yellow', hex: '#FFE599' }, price: 26, originalPrice: 32, discount: 18, isSale: false, isBest: false, isNew: true, query: 'baby knit sleeveless romper playsuit summer' },
      { id: 'kb-rm-10', name: 'Baby Soft Terry Cloth Polo Romper', color: { name: 'Sky Blue', hex: '#87B0D1' }, price: 27, originalPrice: 34, discount: 20, isSale: true, isBest: false, isNew: false, query: 'baby terry cloth polo romper onesie summer' },
      { id: 'kb-rm-11', name: 'Baby Girl Broderie Anglaise Cotton Bubble Romper', color: { name: 'Pure White', hex: '#FFFFFF' }, price: 31, originalPrice: 40, discount: 22, isSale: true, isBest: true, isNew: true, query: 'baby girl white broderie eyelet bubble romper' },
      { id: 'kb-rm-12', name: 'Toddler Corduroy Dungarees with Adjustable Straps', color: { name: 'Rust Orange', hex: '#B85E42' }, price: 35, originalPrice: 45, discount: 22, isSale: false, isBest: true, isNew: false, query: 'toddler corduroy dungarees overalls romper kids' },
      { id: 'kb-rm-13', name: 'Baby Cotton Seersucker Gingham Check Romper', color: { name: 'Lilac Gingham', hex: '#C8A2C8' }, price: 28, originalPrice: 35, discount: 20, isSale: true, isBest: false, isNew: false, query: 'baby seersucker gingham romper bubble onesie' },
      { id: 'kb-rm-14', name: 'Baby Boy Safari Animal Print Cotton Romper', color: { name: 'Khaki Beige', hex: '#C4B197' }, price: 24, originalPrice: 30, discount: 20, isSale: false, isBest: false, isNew: true, query: 'baby boy safari animal print romper onesie' },
      { id: 'kb-rm-15', name: 'Baby Muslin Sleeveless Bubble Sunsuit Romper', color: { name: 'Teal Wave', hex: '#1C7285' }, price: 26, originalPrice: 32, discount: 18, isSale: true, isBest: false, isNew: false, query: 'baby muslin sunsuit bubble romper sleeveless' },
      { id: 'kb-rm-16', name: 'Baby Girl Scalloped Hem Flutter Sleeve Romper', color: { name: 'Coral Peony', hex: '#F88379' }, price: 29, originalPrice: 36, discount: 19, isSale: false, isBest: true, isNew: true, query: 'baby girl flutter sleeve scallop romper floral' },
      { id: 'kb-rm-17', name: 'Baby Pointelle Long-Sleeve Footless Romper', color: { name: 'Warm Cream', hex: '#EDE6D4' }, price: 28, originalPrice: 35, discount: 20, isSale: true, isBest: false, isNew: false, query: 'baby pointelle knit long sleeve romper onesie' },
      { id: 'kb-rm-18', name: 'Baby Boy Oxford Button-Front Collar Romper', color: { name: 'White & Blue Stripe', hex: '#7799BB' }, price: 30, originalPrice: 38, discount: 21, isSale: false, isBest: true, isNew: true, query: 'baby boy collared button up shirt romper' },
      { id: 'kb-rm-19', name: 'Toddler Washed Linen Cross-Back Dungaree Romper', color: { name: 'Charcoal Melange', hex: '#373A40' }, price: 33, originalPrice: 42, discount: 21, isSale: true, isBest: false, isNew: false, query: 'toddler linen cross back overalls dungarees romper' },
      { id: 'kb-rm-20', name: 'Baby Soft Bamboo Modal Zip-Front Footed Romper', color: { name: 'Pale Sage', hex: '#879782' }, price: 28, originalPrice: 36, discount: 22, isSale: true, isBest: true, isNew: true, query: 'baby bamboo modal footed sleeper onesie romper' }
    ]
  },

  // ===================== DRESSES (20) =====================
  {
    category: 'Dresses',
    dir: 'dresses',
    items: [
      { id: 'kb-dr-01', name: 'Little Girl Floral Tiered Cotton Maxi Sundress', color: { name: 'Peach Blossom', hex: '#EAAEB8' }, price: 36, originalPrice: 48, discount: 25, isSale: true, isBest: true, isNew: false, query: 'toddler girl floral maxi sundress tiered kids dress' },
      { id: 'kb-dr-02', name: 'Toddler Girl Broderie Anglaise Eyelet Party Dress', color: { name: 'Bright White', hex: '#FFFFFF' }, price: 38, originalPrice: 50, discount: 24, isSale: false, isBest: true, isNew: true, query: 'little girl white broderie eyelet dress party kids' },
      { id: 'kb-dr-03', name: 'Girls Smocked Bodice Ditsy Floral Flutter Dress', color: { name: 'Pastel Mint', hex: '#B8DED0' }, price: 34, originalPrice: 42, discount: 19, isSale: true, isBest: false, isNew: false, query: 'girl smocked ditsy floral flutter sleeve dress kids' },
      { id: 'kb-dr-04', name: 'Little Girl Velvet Special Occasion Holiday Dress', color: { name: 'Burgundy Wine', hex: '#631828' }, price: 46, originalPrice: 60, discount: 23, isSale: true, isBest: true, isNew: false, query: 'little girl velvet party holiday dress kids formal' },
      { id: 'kb-dr-05', name: 'Toddler Girl Washed Linen Apron Pinafore Dress', color: { name: 'Natural Oatmeal', hex: '#DDD4C4' }, price: 32, originalPrice: 40, discount: 20, isSale: false, isBest: false, isNew: true, query: 'toddler girl linen pinafore apron dress kids' },
      { id: 'kb-dr-06', name: 'Girls Tulle Layered Sparkle Party Ballerina Dress', color: { name: 'Blush Rose', hex: '#DFB8C0' }, price: 42, originalPrice: 55, discount: 23, isSale: true, isBest: true, isNew: true, query: 'little girl tulle party dress ballerina sparkle kids' },
      { id: 'kb-dr-07', name: 'Little Girl Cotton Gingham Check Sleeveless Sundress', color: { name: 'Lemon Yellow', hex: '#FFF44F' }, price: 29, originalPrice: 36, discount: 19, isSale: false, isBest: false, isNew: false, query: 'toddler girl yellow gingham dress summer sundress' },
      { id: 'kb-dr-08', name: 'Toddler Girl Ribbed Knit Long-Sleeve Skater Dress', color: { name: 'Heather Mauve', hex: '#A37E8C' }, price: 30, originalPrice: 38, discount: 21, isSale: true, isBest: false, isNew: false, query: 'girl ribbed knit long sleeve skater dress kids' },
      { id: 'kb-dr-09', name: 'Girls Floral Embroidery Chambray Denim Dress', color: { name: 'Sky Denim', hex: '#8BA9C4' }, price: 35, originalPrice: 45, discount: 22, isSale: false, isBest: true, isNew: true, query: 'little girl embroidered chambray denim dress kids' },
      { id: 'kb-dr-10', name: 'Little Girl Peter Pan Collar Poplin Day Dress', color: { name: 'Navy & White', hex: '#16233B' }, price: 33, originalPrice: 42, discount: 21, isSale: true, isBest: false, isNew: false, query: 'little girl peter pan collar navy dress kids' },
      { id: 'kb-dr-11', name: 'Toddler Girl Ruffle Neck Chiffon Birthday Dress', color: { name: 'Soft Lavender', hex: '#C8A2C8' }, price: 39, originalPrice: 50, discount: 22, isSale: true, isBest: true, isNew: true, query: 'toddler girl lavender ruffle birthday party dress' },
      { id: 'kb-dr-12', name: 'Girls Corduroy Button-Front Overall Pinafore Dress', color: { name: 'Warm Cinnamon', hex: '#9E6A3F' }, price: 36, originalPrice: 46, discount: 21, isSale: false, isBest: false, isNew: false, query: 'little girl corduroy overall pinafore dress kids' },
      { id: 'kb-dr-13', name: 'Little Girl Scalloped Hem Eyelet Summer Dress', color: { name: 'Coral Red', hex: '#F88379' }, price: 31, originalPrice: 39, discount: 20, isSale: true, isBest: false, isNew: true, query: 'little girl coral eyelet summer dress kids' },
      { id: 'kb-dr-14', name: 'Toddler Girl Plaid Tartan Flannel Holiday Dress', color: { name: 'Red Tartan', hex: '#94222D' }, price: 37, originalPrice: 48, discount: 22, isSale: true, isBest: false, isNew: false, query: 'toddler girl red tartan plaid holiday dress kids' },
      { id: 'kb-dr-15', name: 'Girls Daisy Print Chiffon Tiered Dress', color: { name: 'Teal Meadow', hex: '#1C7285' }, price: 34, originalPrice: 42, discount: 19, isSale: false, isBest: true, isNew: true, query: 'little girl daisy print tiered dress kids' },
      { id: 'kb-dr-16', name: 'Little Girl Silk Bow-Tie Princess Dress', color: { name: 'Champagne Ivory', hex: '#F1E3C8' }, price: 49, originalPrice: 65, discount: 24, isSale: true, isBest: true, isNew: false, query: 'little girl champagne silk bow princess dress party' },
      { id: 'kb-dr-17', name: 'Toddler Girl Cotton Seersucker Striped Summer Dress', color: { name: 'Pink & White', hex: '#E4A4B5' }, price: 28, originalPrice: 35, discount: 20, isSale: false, isBest: false, isNew: true, query: 'toddler girl seersucker striped summer dress' },
      { id: 'kb-dr-18', name: 'Girls Smocked Yoke Vintage Rose Sundress', color: { name: 'Vintage Cream Floral', hex: '#FFF5EE' }, price: 35, originalPrice: 44, discount: 20, isSale: true, isBest: false, isNew: false, query: 'girl vintage rose floral smocked dress kids' },
      { id: 'kb-dr-19', name: 'Little Girl Fine Gauge Knit Sweater Dress', color: { name: 'Dusty Blue', hex: '#76A5AF' }, price: 33, originalPrice: 42, discount: 21, isSale: false, isBest: false, isNew: true, query: 'little girl knit sweater dress blue kids winter' },
      { id: 'kb-dr-20', name: 'Toddler Girl Rainbow Striped Tiered Twirl Dress', color: { name: 'Multicolor Pastel', hex: '#B8DED0' }, price: 32, originalPrice: 40, discount: 20, isSale: true, isBest: true, isNew: false, query: 'toddler girl pastel rainbow striped twirl dress' }
    ]
  },

  // ===================== T-SHIRTS (20) =====================
  {
    category: 'T-shirts',
    dir: 't-shirts',
    items: [
      { id: 'kb-ts-01', name: 'Kids Heavyweight Organic Cotton Crewneck Pocket Tee', color: { name: 'Heather Grey', hex: '#9E9EA2' }, price: 18, originalPrice: 24, discount: 25, isSale: true, isBest: true, isNew: false, query: 'kids grey pocket t-shirt organic cotton studio model' },
      { id: 'kb-ts-02', name: 'Toddler Breton Nautical Striped Long-Sleeve Tee', color: { name: 'Navy & White', hex: '#1A2944' }, price: 22, originalPrice: 28, discount: 21, isSale: false, isBest: true, isNew: false, query: 'toddler striped breton long sleeve t shirt kids' },
      { id: 'kb-ts-03', name: 'Little Boy Dinosaur Adventure Explorer Graphic Tee', color: { name: 'Olive Green', hex: '#485542' }, price: 19, originalPrice: 25, discount: 24, isSale: true, isBest: false, isNew: true, query: 'little boy dinosaur graphic t shirt green kids' },
      { id: 'kb-ts-04', name: 'Little Girl Rainbow & Sunshine Embroidered T-Shirt', color: { name: 'Vanilla White', hex: '#FAF9F6' }, price: 20, originalPrice: 26, discount: 23, isSale: false, isBest: true, isNew: true, query: 'little girl rainbow embroidered t shirt white kids' },
      { id: 'kb-ts-05', name: 'Kids Classic Supima Cotton Crewneck Everyday Tee', color: { name: 'Pure White', hex: '#FFFFFF' }, price: 16, originalPrice: 20, discount: 20, isSale: false, isBest: true, isNew: false, query: 'kid plain white t shirt crewneck studio model' },
      { id: 'kb-ts-06', name: 'Toddler Boy Skate & Surf Graphic Cotton Tee', color: { name: 'Washed Charcoal', hex: '#373A40' }, price: 19, originalPrice: 24, discount: 20, isSale: true, isBest: false, isNew: false, query: 'toddler boy skate graphic t-shirt charcoal kids' },
      { id: 'kb-ts-07', name: 'Little Girl Flutter Sleeve Ribbed Cotton T-Shirt', color: { name: 'Dusty Rose', hex: '#C28F97' }, price: 21, originalPrice: 26, discount: 19, isSale: false, isBest: false, isNew: true, query: 'little girl flutter sleeve ribbed t-shirt pink kids' },
      { id: 'kb-ts-08', name: 'Kids Slub Cotton Colorblock Raglan Tee', color: { name: 'Sky Blue & Cream', hex: '#87B0D1' }, price: 22, originalPrice: 28, discount: 21, isSale: true, isBest: false, isNew: false, query: 'kids raglan baseball t-shirt colorblock studio model' },
      { id: 'kb-ts-09', name: 'Toddler Boy Heavyweight Henley Button-Neck Tee', color: { name: 'Terracotta Rust', hex: '#C86D51' }, price: 23, originalPrice: 29, discount: 20, isSale: false, isBest: true, isNew: true, query: 'toddler boy henley t-shirt button neck rust kids' },
      { id: 'kb-ts-10', name: 'Little Girl Daisy Meadow Graphic Print Tee', color: { name: 'Soft Lemon', hex: '#FFE599' }, price: 19, originalPrice: 24, discount: 20, isSale: true, isBest: false, isNew: false, query: 'little girl floral daisy graphic t-shirt yellow kids' },
      { id: 'kb-ts-11', name: 'Kids Waffle-Knit Long-Sleeve Thermal Top', color: { name: 'Oatmeal Cream', hex: '#DDD4C4' }, price: 25, originalPrice: 32, discount: 21, isSale: false, isBest: true, isNew: false, query: 'kids waffle knit long sleeve thermal t shirt oatmeal' },
      { id: 'kb-ts-12', name: 'Toddler Ringer T-Shirt with Contrast Ribbed Collar', color: { name: 'Forest Green & White', hex: '#2A4638' }, price: 20, originalPrice: 25, discount: 20, isSale: true, isBest: false, isNew: true, query: 'toddler ringer t-shirt contrast collar retro kids' },
      { id: 'kb-ts-13', name: 'Little Boy Vintage Car Heritage Graphic Tee', color: { name: 'Mustard Ochre', hex: '#D4AF37' }, price: 21, originalPrice: 27, discount: 22, isSale: true, isBest: false, isNew: false, query: 'little boy vintage car graphic t-shirt yellow kids' },
      { id: 'kb-ts-14', name: 'Little Girl Scallop Neck Pointelle Cotton Top', color: { name: 'Pale Lilac', hex: '#C8A2C8' }, price: 22, originalPrice: 28, discount: 21, isSale: false, isBest: false, isNew: true, query: 'little girl pointelle scallop t-shirt lilac kids' },
      { id: 'kb-ts-15', name: 'Kids 100% Organic Cotton Striped Pocket Tee', color: { name: 'Sage & White', hex: '#879782' }, price: 20, originalPrice: 25, discount: 20, isSale: false, isBest: true, isNew: false, query: 'kids organic striped t-shirt with pocket sage' },
      { id: 'kb-ts-16', name: 'Toddler Boy Ocean Wave Surf Graphic Tee', color: { name: 'Muted Cobalt', hex: '#2C496A' }, price: 18, originalPrice: 24, discount: 25, isSale: true, isBest: false, isNew: false, query: 'toddler boy surf ocean graphic t-shirt blue kids' },
      { id: 'kb-ts-17', name: 'Little Girl Sweet Floral Pocket Print T-Shirt', color: { name: 'Blush Pink', hex: '#FADADD' }, price: 19, originalPrice: 24, discount: 20, isSale: false, isBest: false, isNew: true, query: 'little girl floral pocket t-shirt pink kids' },
      { id: 'kb-ts-18', name: 'Kids French Terry Short-Sleeve Relaxed Tee', color: { name: 'Warm Sand', hex: '#DED5C4' }, price: 23, originalPrice: 30, discount: 23, isSale: true, isBest: false, isNew: false, query: 'kids short sleeve french terry t shirt beige' },
      { id: 'kb-ts-19', name: 'Toddler Boy Wild Animal Safari Illustrated Tee', color: { name: 'Khaki Tan', hex: '#BA9C76' }, price: 20, originalPrice: 25, discount: 20, isSale: false, isBest: true, isNew: true, query: 'toddler safari animal graphic t-shirt khaki kids' },
      { id: 'kb-ts-20', name: 'Little Girl Heart Embroidered Soft Cotton Tee', color: { name: 'Pastel Mint', hex: '#B8DED0' }, price: 19, originalPrice: 24, discount: 20, isSale: true, isBest: false, isNew: false, query: 'little girl embroidered heart t-shirt mint green' }
    ]
  },

  // ===================== ORGANIC ESSENTIALS (20) =====================
  {
    category: 'Organic Essentials',
    dir: 'organic-essentials',
    items: [
      { id: 'kb-oe-01', name: 'GOTS Certified Organic Cotton Bodysuits 3-Pack', color: { name: 'Neutral Creams', hex: '#FAF7EE' }, price: 28, originalPrice: 36, discount: 22, isSale: true, isBest: true, isNew: false, query: 'organic cotton baby bodysuit 3 pack neutral white' },
      { id: 'kb-oe-02', name: 'Organic Ribbed Cotton Two-Way Zip Footed Sleepsuit', color: { name: 'Sage Green', hex: '#7E917A' }, price: 29, originalPrice: 38, discount: 23, isSale: true, isBest: true, isNew: true, query: 'organic ribbed cotton baby sleepsuit zip sleeper' },
      { id: 'kb-oe-03', name: 'Organic Cotton Wearable Blanket Sleep Sack 1.0 TOG', color: { name: 'Cloud White', hex: '#FFFFFF' }, price: 34, originalPrice: 44, discount: 22, isSale: false, isBest: true, isNew: false, query: 'organic cotton baby sleep sack wearable blanket 1.0 tog' },
      { id: 'kb-oe-04', name: 'Organic Muslin Cotton Large Swaddle Blankets 2-Pack', color: { name: 'Botanical Fern', hex: '#77997A' }, price: 30, originalPrice: 38, discount: 21, isSale: true, isBest: false, isNew: false, query: 'organic muslin baby swaddle blankets 2 pack' },
      { id: 'kb-oe-05', name: 'Organic Cotton Cross-Over Kimono Bodysuits', color: { name: 'Oatmeal Heather', hex: '#DDD4C4' }, price: 24, originalPrice: 30, discount: 20, isSale: false, isBest: true, isNew: true, query: 'organic cotton kimono baby bodysuit long sleeve' },
      { id: 'kb-oe-06', name: 'Organic Cotton Waffle Knit Lounge Pant', color: { name: 'Warm Moka', hex: '#87695B' }, price: 22, originalPrice: 28, discount: 21, isSale: true, isBest: false, isNew: false, query: 'organic cotton waffle knit baby pants leggings' },
      { id: 'kb-oe-07', name: 'Pure Organic Cotton Non-Scratch Mittens & Booties Set', color: { name: 'Vanilla Cream', hex: '#EDE6D4' }, price: 16, originalPrice: 20, discount: 20, isSale: false, isBest: false, isNew: true, query: 'organic baby scratch mittens booties set cotton' },
      { id: 'kb-oe-08', name: 'Organic Cotton Ribbed Knot Beanie Hats 2-Pack', color: { name: 'Sand & Sage', hex: '#879782' }, price: 18, originalPrice: 22, discount: 18, isSale: true, isBest: false, isNew: false, query: 'organic cotton baby knotted beanie hats 2 pack' },
      { id: 'kb-oe-09', name: 'Organic Interlock Cotton Long-Sleeve Romper', color: { name: 'Dusty Rose', hex: '#BF7C87' }, price: 27, originalPrice: 35, discount: 22, isSale: false, isBest: true, isNew: false, query: 'organic cotton baby romper long sleeve onesie pink' },
      { id: 'kb-oe-10', name: 'Organic Muslin Absorbent Bandana Bibs 4-Pack', color: { name: 'Earthy Neutrals', hex: '#CDBCA9' }, price: 20, originalPrice: 25, discount: 20, isSale: true, isBest: true, isNew: true, query: 'organic muslin baby bandana bibs 4 pack neutral' },
      { id: 'kb-oe-11', name: 'Certified Organic Terry Hooded Baby Bath Towel', color: { name: 'Pure White', hex: '#FFFFFF' }, price: 32, originalPrice: 40, discount: 20, isSale: false, isBest: false, isNew: false, query: 'organic cotton hooded baby bath towel white soft' },
      { id: 'kb-oe-12', name: 'Organic Pointelle Cotton Kimono Wrap Top', color: { name: 'Pale Grey', hex: '#AEB1B8' }, price: 21, originalPrice: 26, discount: 19, isSale: true, isBest: false, isNew: true, query: 'organic pointelle kimono baby shirt wrap top' },
      { id: 'kb-oe-13', name: 'Organic Cotton Footless Ribbed Lounge Sleeper', color: { name: 'Muted Terracotta', hex: '#CC4E33' }, price: 28, originalPrice: 35, discount: 20, isSale: false, isBest: true, isNew: false, query: 'organic cotton footless baby sleeper romper zipper' },
      { id: 'kb-oe-14', name: 'GOTS Organic Cotton Cami Vest Bodysuits 3-Pack', color: { name: 'Soft Pastels', hex: '#B8DED0' }, price: 22, originalPrice: 28, discount: 21, isSale: true, isBest: false, isNew: false, query: 'organic baby sleeveless bodysuit vest 3 pack' },
      { id: 'kb-oe-15', name: 'Organic Cotton Cellular Breathable Cot Blanket', color: { name: 'Natural Ecru', hex: '#F0EBD8' }, price: 32, originalPrice: 40, discount: 20, isSale: false, isBest: false, isNew: true, query: 'organic cellular baby blanket crib cot cotton' },
      { id: 'kb-oe-16', name: 'Organic Cotton Drawstring Footed Harem Pants', color: { name: 'Sky Blue Heather', hex: '#87B0D1' }, price: 21, originalPrice: 26, discount: 19, isSale: true, isBest: false, isNew: false, query: 'organic cotton baby harem pants footed blue' },
      { id: 'kb-oe-17', name: 'Organic Cotton Gentle Grip Ankle Socks 5-Pack', color: { name: 'Muted Earth', hex: '#C2A379' }, price: 16, originalPrice: 20, discount: 20, isSale: false, isBest: true, isNew: true, query: 'organic cotton baby ankle socks 5 pack non slip' },
      { id: 'kb-oe-18', name: 'Organic Muslin Cotton Burp Cloths Set', color: { name: 'Olive & Cream', hex: '#778873' }, price: 19, originalPrice: 24, discount: 20, isSale: true, isBest: false, isNew: false, query: 'organic muslin baby burp cloths pack cotton' },
      { id: 'kb-oe-19', name: 'Organic Cotton Cozy Thermal Long-Sleeve Underlayer', color: { name: 'Warm Biscuit', hex: '#D8C7B5' }, price: 24, originalPrice: 30, discount: 20, isSale: false, isBest: false, isNew: false, query: 'organic cotton baby thermal long sleeve top shirt' },
      { id: 'kb-oe-20', name: 'Organic Cotton Quilted Cozy Sleep Sack 2.5 TOG', color: { name: 'Muted Lilac', hex: '#C8A2C8' }, price: 38, originalPrice: 50, discount: 24, isSale: true, isBest: true, isNew: true, query: 'organic cotton baby sleep sack quilted 2.5 tog' }
    ]
  }
];

async function main() {
  console.log('Starting Kids & Baby catalog builder...');

  const verifiedProducts = [];

  for (const catGroup of KIDS_BABY_CATALOG_DEF) {
    console.log(`\n=== Processing Category: ${catGroup.category} (20 items) ===`);
    const catDir = path.join('public/assets/kids-baby', catGroup.dir);
    if (!fs.existsSync(catDir)) fs.mkdirSync(catDir, { recursive: true });

    for (let i = 0; i < catGroup.items.length; i++) {
      const item = catGroup.items[i];
      const targetRelPath = `/assets/kids-baby/${catGroup.dir}/${item.id}.jpg`;
      const targetAbsPath = path.join('public', targetRelPath);

      let imageSaved = false;

      // Check if file already exists and is valid size
      if (fs.existsSync(targetAbsPath) && fs.statSync(targetAbsPath).size > 15000) {
        imageSaved = true;
      } else {
        console.log(`[${catGroup.category} ${i + 1}/20] Downloading: ${item.name} ...`);
        const searchRes = await searchImage(item.query);
        if (searchRes && searchRes.buffer) {
          const tempPath = `/tmp/raw_kb_${item.id}.jpg`;
          fs.writeFileSync(tempPath, searchRes.buffer);
          try {
            // Resize with ImageMagick to 600x750 (4:5 portrait) with clean cropping and compression
            execSync(`convert "${tempPath}" -resize "600x750^" -gravity center -extent 600x750 -quality 86 "${targetAbsPath}"`);
            if (fs.existsSync(targetAbsPath) && fs.statSync(targetAbsPath).size > 12000) {
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

      // If still not saved, fallback to a reliable curated kids photo
      if (!imageSaved) {
        console.log(`  -> Using verified kids fallback for ${item.id}`);
        const fallbackUrl = 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&w=600&q=80';
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

      // Secondary category mappings for broad discovery
      if (catGroup.category === 'Dresses') subcats.push('Girls');
      if (catGroup.category === 'Rompers') subcats.push('Newborn');

      const isBaby = ['Newborn', 'Rompers', 'Organic Essentials'].includes(catGroup.category);
      const isKid = ['Boys', 'Girls', 'Dresses', 'T-shirts'].includes(catGroup.category);
      const categoryTag = isBaby ? 'baby' : 'kids';

      const sizes = isBaby
        ? ['0-3M', '3-6M', '6-12M', '12-18M']
        : ['2-3Y', '3-4Y', '5-6Y', '7-8Y', '9-10Y'];

      const colorList = [
        item.color,
        { name: 'Oatmeal Heather', hex: '#E0D8C8' },
        { name: 'Cloud White', hex: '#FAF9F6' }
      ];

      const product = {
        id: item.id,
        name: item.name,
        slug: slug,
        category: categoryTag,
        subcategory: catGroup.category,
        subcategories: subcats,
        price: item.price,
        originalPrice: item.originalPrice,
        discountPercentage: item.discount,
        rating: +(4.6 + Math.random() * 0.3).toFixed(1),
        reviewsCount: Math.floor(35 + Math.random() * 90),
        isNew: item.isNew,
        isSale: item.isSale,
        isBestSeller: item.isBest,
        colors: colorList,
        sizes: sizes,
        description: `Delightful ${item.name.toLowerCase()} crafted from ultra-soft, hypoallergenic fabrics with tagless seams, gentle stretch, and easy snap closures designed for happy little ones.`,
        details: [
          'Ultra-soft breathable cotton designed for delicate, sensitive skin',
          'Tagless neck labels and flatlock seams prevent itching and irritation',
          'Nickel-free snaps and reinforced double stitching for endless washes',
          'Pre-washed and pre-shrunk for an enduring, true-to-size comfortable fit'
        ],
        fabricCare: [
          'Machine wash warm with gentle baby-safe detergent',
          'Tumble dry low or line dry in shade; do not bleach',
          'Cool iron if necessary on reverse side'
        ],
        images: [targetRelPath],
        inStock: true,
        sku: `FAM-KB-${catGroup.dir.toUpperCase().substring(0, 3)}-${item.id.replace('kb-', '').toUpperCase()}`,
        tags: [
          'kids-baby',
          categoryTag,
          catGroup.category.toLowerCase().replace(/\s+/g, '-'),
          ...item.name.toLowerCase().split(' ').filter(w => w.length > 3)
        ]
      };

      verifiedProducts.push(product);
    }
  }

  // Write TypeScript file src/data/kidsBabyProducts.ts
  const fileContent = `import { Product } from '../types';\n\nexport const KIDS_BABY_PRODUCTS: Product[] = ${JSON.stringify(verifiedProducts, null, 2)};\n`;
  fs.writeFileSync('src/data/kidsBabyProducts.ts', fileContent, 'utf8');
  console.log(`\nSuccessfully wrote ${verifiedProducts.length} verified products to src/data/kidsBabyProducts.ts`);

  // Generate montages for each category
  console.log('\nGenerating visual verification montages for all 8 Kids & Baby categories...');
  for (const catGroup of KIDS_BABY_CATALOG_DEF) {
    const imgList = verifiedProducts
      .filter(p => p.subcategory === catGroup.category)
      .map(p => `public${p.images[0]}`);

    const montageTarget = `public/montage_kb_${catGroup.dir.replace('-', '_')}.jpg`;
    try {
      execSync(`montage ${imgList.join(' ')} -tile 5x4 -geometry 240x300+4+4 -title "Kids & Baby ${catGroup.category} 1 to 20" ${montageTarget}`);
      console.log(`  -> Generated ${montageTarget}`);
    } catch (e) {
      console.error(`  -> Error generating montage for ${catGroup.category}:`, e.message);
    }
  }

  console.log('\nKids & Baby catalog build complete!');
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
