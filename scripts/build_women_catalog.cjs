const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const { searchImage } = require('./fetch_catalog.cjs');

const CATALOG_DEF = [
  // ===================== DRESSES (20) =====================
  {
    category: 'Dresses',
    dir: 'dresses',
    items: [
      {
        id: 'w-dr-01',
        name: 'Scarlet Halter Silk Ballgown Maxi Dress',
        color: { name: 'Scarlet Red', hex: '#B22222' },
        altColors: [{ name: 'Burgundy', hex: '#800020' }, { name: 'Black', hex: '#1C1C1C' }],
        price: 98, originalPrice: 130, discount: 25, isSale: true, isBest: true, isNew: false,
        query: 'women red silk halter maxi gown evening dress fashion model'
      },
      {
        id: 'w-dr-02',
        name: 'Crimson Floral Belted A-Line Midi Dress',
        color: { name: 'Crimson Floral', hex: '#A81C28' },
        altColors: [{ name: 'Cream Floral', hex: '#FDF6EE' }, { name: 'Navy Floral', hex: '#1B263B' }],
        price: 68, originalPrice: 85, discount: 20, isSale: true, isBest: false, isNew: true,
        query: 'women red floral print belted midi dress fashion model'
      },
      {
        id: 'w-dr-03',
        name: 'White Off-Shoulder Eyelet Tiered Mini Sundress',
        color: { name: 'Optic White', hex: '#FAF9F6' },
        altColors: [{ name: 'Soft Butter', hex: '#FFF8DC' }, { name: 'Sky Blue', hex: '#A7C7E7' }],
        price: 54, originalPrice: 68, discount: 21, isSale: false, isBest: true, isNew: true,
        query: 'woman white off shoulder ruffle mini sundress fashion model'
      },
      {
        id: 'w-dr-04',
        name: 'Floral Silk Peony Print Flare Midi Dress',
        color: { name: 'Blush Peony', hex: '#E8C5C8' },
        altColors: [{ name: 'Ivory Floral', hex: '#FFF5EE' }, { name: 'Rose', hex: '#C77988' }],
        price: 78, originalPrice: 98, discount: 20, isSale: true, isBest: false, isNew: false,
        query: 'woman floral peony print satin midi flare dress fashion model'
      },
      {
        id: 'w-dr-05',
        name: 'Ruby Cape-Sleeve Column Cocktail Dress',
        color: { name: 'Ruby Crimson', hex: '#9B111E' },
        altColors: [{ name: 'Emerald', hex: '#046307' }, { name: 'Black Velvet', hex: '#111111' }],
        price: 115, originalPrice: 145, discount: 21, isSale: true, isBest: false, isNew: true,
        query: 'woman red cape sleeve cocktail sheath dress fashion model'
      },
      {
        id: 'w-dr-06',
        name: 'Burgundy Pure Washed Linen Shirt Dress',
        color: { name: 'Burgundy Wine', hex: '#6B1D2F' },
        altColors: [{ name: 'Natural Sand', hex: '#D8C7B5' }, { name: 'Olive Khaki', hex: '#556B2F' }],
        price: 72, originalPrice: 90, discount: 20, isSale: false, isBest: true, isNew: false,
        query: 'woman linen midi shirt dress button front burgundy or brown fashion model'
      },
      {
        id: 'w-dr-07',
        name: 'Plum Purple Off-Shoulder Crepe Evening Gown',
        color: { name: 'Plum Royal', hex: '#4A154B' },
        altColors: [{ name: 'Midnight', hex: '#191970' }, { name: 'Black', hex: '#151515' }],
        price: 120, originalPrice: 160, discount: 25, isSale: true, isBest: false, isNew: false,
        query: 'woman off shoulder purple formal evening gown dress fashion model'
      },
      {
        id: 'w-dr-08',
        name: 'Terracotta Polka Dot Summer Slit Sundress',
        color: { name: 'Terracotta Rust', hex: '#CC4E33' },
        altColors: [{ name: 'Mustard Dot', hex: '#E1AD01' }, { name: 'Navy Dot', hex: '#1C2951' }],
        price: 48, originalPrice: 60, discount: 20, isSale: true, isBest: false, isNew: true,
        query: 'woman polka dot slit wrap midi dress field fashion model'
      },
      {
        id: 'w-dr-09',
        name: 'Emerald Satin Cowl-Neck Bias Slip Dress',
        color: { name: 'Emerald Green', hex: '#0E5C3A' },
        altColors: [{ name: 'Champagne', hex: '#F7E7CE' }, { name: 'Black Onyx', hex: '#0F0F0F' }],
        price: 64, originalPrice: 80, discount: 20, isSale: false, isBest: true, isNew: false,
        query: 'woman emerald green satin cowl neck slip dress fashion model'
      },
      {
        id: 'w-dr-10',
        name: 'Black Square-Neck Ribbed Bodycon Midi Dress',
        color: { name: 'Classic Black', hex: '#1C1C1C' },
        altColors: [{ name: 'Heather Charcoal', hex: '#36454F' }, { name: 'Espresso', hex: '#3B2F2F' }],
        price: 52, originalPrice: 65, discount: 20, isSale: false, isBest: true, isNew: false,
        query: 'woman black square neck knit ribbed bodycon midi dress fashion model'
      },
      {
        id: 'w-dr-11',
        name: 'Powder Blue Tiered Chiffon Maxi Dress',
        color: { name: 'Powder Blue', hex: '#96C5D7' },
        altColors: [{ name: 'Soft Sage', hex: '#9CAF88' }, { name: 'Blush', hex: '#DEB887' }],
        price: 84, originalPrice: 110, discount: 24, isSale: true, isBest: false, isNew: true,
        query: 'woman powder blue tiered chiffon maxi dress elegant fashion model'
      },
      {
        id: 'w-dr-12',
        name: 'Butter Yellow Puff-Sleeve Linen Day Dress',
        color: { name: 'Butter Yellow', hex: '#FFE599' },
        altColors: [{ name: 'Natural Ecru', hex: '#EFEBD9' }, { name: 'Lilac', hex: '#C8A2C8' }],
        price: 62, originalPrice: 78, discount: 21, isSale: false, isBest: false, isNew: true,
        query: 'woman yellow puff sleeve linen midi dress fashion model'
      },
      {
        id: 'w-dr-13',
        name: 'French Floral Meadow Tie-Back Midi Dress',
        color: { name: 'Meadow Floral', hex: '#7E9F7B' },
        altColors: [{ name: 'Blush Cream', hex: '#FADADD' }, { name: 'Periwinkle', hex: '#CCCCFF' }],
        price: 70, originalPrice: 88, discount: 20, isSale: true, isBest: false, isNew: false,
        query: 'woman floral print tie back midi summer dress fashion model'
      },
      {
        id: 'w-dr-14',
        name: 'Sage Green Ruffled Bohemian Tiered Maxi Dress',
        color: { name: 'Sage Green', hex: '#778873' },
        altColors: [{ name: 'Olive', hex: '#556B2F' }, { name: 'Oatmeal', hex: '#E3DAC9' }],
        price: 82, originalPrice: 105, discount: 22, isSale: true, isBest: false, isNew: true,
        query: 'woman sage green bohemian tiered maxi dress fashion model'
      },
      {
        id: 'w-dr-15',
        name: 'Navy Blue Pleated Wrap Shirt Dress',
        color: { name: 'Midnight Navy', hex: '#162238' },
        altColors: [{ name: 'Camel Tan', hex: '#C19A6B' }, { name: 'Bottle Green', hex: '#004225' }],
        price: 86, originalPrice: 115, discount: 25, isSale: true, isBest: true, isNew: false,
        query: 'woman navy blue pleated wrap shirt dress fashion model'
      },
      {
        id: 'w-dr-16',
        name: 'Champagne Silk Bias-Cut Gown Dress',
        color: { name: 'Champagne Gold', hex: '#F1E3C8' },
        altColors: [{ name: 'Pearl Ivory', hex: '#FDFBF7' }, { name: 'Soft Silver', hex: '#DCDCDC' }],
        price: 110, originalPrice: 150, discount: 27, isSale: true, isBest: false, isNew: false,
        query: 'woman champagne gold silk bias cut maxi dress fashion model'
      },
      {
        id: 'w-dr-17',
        name: 'Lilac Floral Flutter-Sleeve Sundress',
        color: { name: 'Soft Lilac', hex: '#C8A2C8' },
        altColors: [{ name: 'Sky Floral', hex: '#87CEEB' }, { name: 'Pale Rose', hex: '#FFE4E1' }],
        price: 58, originalPrice: 72, discount: 19, isSale: false, isBest: false, isNew: true,
        query: 'woman lilac purple floral flutter sleeve summer dress fashion model'
      },
      {
        id: 'w-dr-18',
        name: 'Chocolate Ribbed Knit Turtleneck Sweater Dress',
        color: { name: 'Chocolate Brown', hex: '#3E2723' },
        altColors: [{ name: 'Oatmeal', hex: '#D8C7B5' }, { name: 'Black', hex: '#1A1A1A' }],
        price: 76, originalPrice: 95, discount: 20, isSale: true, isBest: true, isNew: false,
        query: 'woman brown ribbed knit turtleneck sweater dress fashion model'
      },
      {
        id: 'w-dr-19',
        name: 'Coral Pink Broderie Eyelet Cotton Sundress',
        color: { name: 'Coral Pink', hex: '#F88379' },
        altColors: [{ name: 'White', hex: '#FFFFFF' }, { name: 'Lemon', hex: '#FFF44F' }],
        price: 66, originalPrice: 82, discount: 20, isSale: false, isBest: false, isNew: true,
        query: 'woman coral pink eyelet cotton summer dress fashion model'
      },
      {
        id: 'w-dr-20',
        name: 'Black & White Abstract Print Wrap Midi Dress',
        color: { name: 'Monochrome Print', hex: '#2B2B2B' },
        altColors: [{ name: 'Navy Print', hex: '#1B263B' }, { name: 'Sepia Print', hex: '#704214' }],
        price: 74, originalPrice: 95, discount: 22, isSale: true, isBest: false, isNew: false,
        query: 'woman monochrome black and white printed wrap midi dress fashion model'
      }
    ]
  },

  // ===================== TOPS (20) =====================
  {
    category: 'Tops',
    dir: 'tops',
    items: [
      {
        id: 'w-tp-01',
        name: 'Pure Silk Charmeuse V-Neck Blouse',
        color: { name: 'Ivory Pearl', hex: '#FFFFF0' },
        altColors: [{ name: 'Champagne', hex: '#F7E7CE' }, { name: 'Midnight', hex: '#1A2436' }],
        price: 58, originalPrice: 75, discount: 23, isSale: true, isBest: true, isNew: false,
        query: 'woman ivory white silk v neck blouse fashion model'
      },
      {
        id: 'w-tp-02',
        name: 'Ribbed Sweetheart Long-Sleeve Knit Top',
        color: { name: 'Soft Mocha', hex: '#9E8578' },
        altColors: [{ name: 'Cream', hex: '#FFFDD0' }, { name: 'Black', hex: '#1F1F1F' }],
        price: 38, originalPrice: 48, discount: 21, isSale: false, isBest: true, isNew: true,
        query: 'woman ribbed sweetheart neckline long sleeve top fashion model'
      },
      {
        id: 'w-tp-03',
        name: 'Oversized Poplin Button-Down Shirt',
        color: { name: 'Classic Sky Blue', hex: '#76A5AF' },
        altColors: [{ name: 'Crisp White', hex: '#FAFAFA' }, { name: 'Blue Stripe', hex: '#93B7D8' }],
        price: 46, originalPrice: 58, discount: 21, isSale: true, isBest: true, isNew: false,
        query: 'woman blue oversized cotton button down shirt fashion model'
      },
      {
        id: 'w-tp-04',
        name: 'Square-Neck Puff-Sleeve Linen Blouse',
        color: { name: 'Sage Green', hex: '#8A9A86' },
        altColors: [{ name: 'Natural Ecru', hex: '#F0ECE1' }, { name: 'Terracotta', hex: '#C86D51' }],
        price: 42, originalPrice: 52, discount: 19, isSale: false, isBest: false, isNew: true,
        query: 'woman puff sleeve linen blouse square neck fashion model'
      },
      {
        id: 'w-tp-05',
        name: 'Ruched Mesh Long-Sleeve Mock-Neck Top',
        color: { name: 'Black Onyx', hex: '#1A1A1A' },
        altColors: [{ name: 'Chocolate', hex: '#3E2723' }, { name: 'Deep Teal', hex: '#134E5E' }],
        price: 36, originalPrice: 45, discount: 20, isSale: true, isBest: false, isNew: false,
        query: 'woman sheer black long sleeve mesh top fashion model'
      },
      {
        id: 'w-tp-06',
        name: 'Chunky Fisherman Cable-Knit Crew Sweater',
        color: { name: 'Oatmeal Cream', hex: '#E6DFC8' },
        altColors: [{ name: 'Camel', hex: '#C19A6B' }, { name: 'Muted Olive', hex: '#6E7E65' }],
        price: 68, originalPrice: 85, discount: 20, isSale: false, isBest: true, isNew: false,
        query: 'woman chunky cream cable knit sweater fashion model'
      },
      {
        id: 'w-tp-07',
        name: 'French Breton Striped Long-Sleeve Top',
        color: { name: 'Navy & White Stripe', hex: '#1B263B' },
        altColors: [{ name: 'Black & White', hex: '#222222' }, { name: 'Red & Cream', hex: '#900C3F' }],
        price: 34, originalPrice: 42, discount: 19, isSale: true, isBest: true, isNew: false,
        query: 'woman breton striped long sleeve shirt fashion model'
      },
      {
        id: 'w-tp-08',
        name: 'Cowl-Neck Satin Cami Camisole Top',
        color: { name: 'Rose Gold Satin', hex: '#B76E79' },
        altColors: [{ name: 'Champagne', hex: '#F7E7CE' }, { name: 'Black', hex: '#181818' }],
        price: 32, originalPrice: 40, discount: 20, isSale: false, isBest: false, isNew: true,
        query: 'woman satin cowl neck cami top fashion model'
      },
      {
        id: 'w-tp-09',
        name: 'Floral Chiffon Ruffle Peplum Blouse',
        color: { name: 'Blush Floral Print', hex: '#DFB8C0' },
        altColors: [{ name: 'Sage Floral', hex: '#8FBC8F' }, { name: 'Navy Floral', hex: '#1C2E4A' }],
        price: 45, originalPrice: 58, discount: 22, isSale: true, isBest: false, isNew: false,
        query: 'woman floral print chiffon ruffle blouse fashion model'
      },
      {
        id: 'w-tp-10',
        name: 'Modal Seamless Mock-Neck Fitted Tee',
        color: { name: 'Forest Green', hex: '#22553B' },
        altColors: [{ name: 'Burgundy', hex: '#651C32' }, { name: 'Charcoal', hex: '#36454F' }],
        price: 28, originalPrice: 35, discount: 20, isSale: false, isBest: true, isNew: false,
        query: 'woman fitted high neck mock turtleneck top fashion model'
      },
      {
        id: 'w-tp-11',
        name: 'Broderie Anglaise Eyelet Cotton Blouse',
        color: { name: 'Pure White', hex: '#FFFFFF' },
        altColors: [{ name: 'Lemon', hex: '#FFF9A6' }, { name: 'Sky Blue', hex: '#AED8F2' }],
        price: 49, originalPrice: 62, discount: 21, isSale: true, isBest: false, isNew: true,
        query: 'woman white broderie eyelet cotton blouse fashion model'
      },
      {
        id: 'w-tp-12',
        name: 'Fine-Gauge Merino Wool Turtleneck Knit',
        color: { name: 'Camel Tan', hex: '#C69C6D' },
        altColors: [{ name: 'Off-White', hex: '#FAF0E6' }, { name: 'Espresso', hex: '#4A3525' }],
        price: 64, originalPrice: 80, discount: 20, isSale: false, isBest: true, isNew: false,
        query: 'woman merino wool camel turtleneck sweater fashion model'
      },
      {
        id: 'w-tp-13',
        name: 'Linen Tie-Front Wrap Crop Blouse',
        color: { name: 'Terracotta Rust', hex: '#C86D51' },
        altColors: [{ name: 'White', hex: '#FCFCFC' }, { name: 'Mustard', hex: '#D4AF37' }],
        price: 39, originalPrice: 48, discount: 19, isSale: false, isBest: false, isNew: true,
        query: 'woman linen wrap crop top tie front fashion model'
      },
      {
        id: 'w-tp-14',
        name: 'One-Shoulder Ribbed Asymmetric Knit Top',
        color: { name: 'Heather Grey', hex: '#808080' },
        altColors: [{ name: 'Black', hex: '#1F1F1F' }, { name: 'Cream', hex: '#FFFDD0' }],
        price: 35, originalPrice: 44, discount: 20, isSale: true, isBest: false, isNew: false,
        query: 'woman one shoulder ribbed knit top fashion model'
      },
      {
        id: 'w-tp-15',
        name: 'Organic Cotton Boyfriend Crewneck Tee',
        color: { name: 'Washed Charcoal', hex: '#373F43' },
        altColors: [{ name: 'Vintage White', hex: '#F3EFE0' }, { name: 'Faded Olive', hex: '#5B6855' }],
        price: 26, originalPrice: 32, discount: 19, isSale: false, isBest: true, isNew: false,
        query: 'woman oversized vintage graphic t shirt fashion model'
      },
      {
        id: 'w-tp-16',
        name: 'Organza Sheer Billow-Sleeve Blouse',
        color: { name: 'Soft Lavender', hex: '#D8BFD8' },
        altColors: [{ name: 'Ivory', hex: '#FFFFF0' }, { name: 'Noir', hex: '#1C1C1C' }],
        price: 52, originalPrice: 65, discount: 20, isSale: true, isBest: false, isNew: true,
        query: 'woman sheer organza puff sleeve blouse fashion model'
      },
      {
        id: 'w-tp-17',
        name: 'Cashmere-Blend V-Neck Relaxed Cardigan',
        color: { name: 'Buttercream Beige', hex: '#EBE5D8' },
        altColors: [{ name: 'Soft Sage', hex: '#9CAF88' }, { name: 'Muted Pink', hex: '#E8CCD7' }],
        price: 74, originalPrice: 98, discount: 24, isSale: true, isBest: true, isNew: false,
        query: 'woman relaxed v neck cardigan sweater fashion model'
      },
      {
        id: 'w-tp-18',
        name: 'Smocked Bodice Ditsy Floral Blouse',
        color: { name: 'Dusty Rose Floral', hex: '#C08081' },
        altColors: [{ name: 'Blue Floral', hex: '#6495ED' }, { name: 'Yellow Floral', hex: '#F0E68C' }],
        price: 42, originalPrice: 52, discount: 19, isSale: false, isBest: false, isNew: true,
        query: 'woman smocked floral crop top blouse fashion model'
      },
      {
        id: 'w-tp-19',
        name: 'Structured Cotton Boatneck Sleeveless Top',
        color: { name: 'Midnight Onyx', hex: '#141414' },
        altColors: [{ name: 'Optic White', hex: '#F8F8FF' }, { name: 'Caramel', hex: '#AF6E4D' }],
        price: 30, originalPrice: 38, discount: 21, isSale: false, isBest: false, isNew: false,
        query: 'woman boatneck sleeveless top black elegant fashion model'
      },
      {
        id: 'w-tp-20',
        name: 'Brushed Alpaca Knit Relaxed Pullover',
        color: { name: 'Muted Seafoam', hex: '#87A99C' },
        altColors: [{ name: 'Oatmeal', hex: '#DFD7C7' }, { name: 'Mauve', hex: '#9E7B88' }],
        price: 66, originalPrice: 85, discount: 22, isSale: true, isBest: false, isNew: true,
        query: 'woman soft brushed knit crewneck sweater pastel fashion model'
      }
    ]
  },

  // ===================== JEANS (20) =====================
  {
    category: 'Jeans',
    dir: 'jeans',
    items: [
      {
        id: 'w-jn-01',
        name: 'High-Rise Vintage Straight Leg Denim Jeans',
        color: { name: 'Medium Vintage Indigo', hex: '#4A6984' },
        altColors: [{ name: 'Light Stonewash', hex: '#8BA9C4' }, { name: 'Raw Dark Indigo', hex: '#1B2E4B' }],
        price: 68, originalPrice: 85, discount: 20, isSale: true, isBest: true, isNew: false,
        query: 'woman high rise straight leg denim jeans studio model'
      },
      {
        id: 'w-jn-02',
        name: '90s Relaxed Wide-Leg Rigid Denim Jeans',
        color: { name: 'Light Indigo Wash', hex: '#82A3BF' },
        altColors: [{ name: 'Medium Blue', hex: '#53789E' }, { name: 'Ecru Off-White', hex: '#ECE8DD' }],
        price: 74, originalPrice: 95, discount: 22, isSale: true, isBest: true, isNew: true,
        query: 'woman wide leg denim jeans relaxed studio model'
      },
      {
        id: 'w-jn-03',
        name: 'Ultra High-Waist Tapered Mom Fit Jeans',
        color: { name: 'Stonewashed Blue', hex: '#6384A6' },
        altColors: [{ name: 'Washed Black', hex: '#2F3238' }, { name: 'Sun Bleached', hex: '#9BB9D3' }],
        price: 62, originalPrice: 78, discount: 21, isSale: false, isBest: true, isNew: false,
        query: 'woman high waisted mom fit jeans studio model'
      },
      {
        id: 'w-jn-04',
        name: '70s High-Rise Flared Bell-Bottom Jeans',
        color: { name: 'Dark Indigo Rinse', hex: '#1C2E4D' },
        altColors: [{ name: 'Medium Wash', hex: '#4B6B8B' }, { name: 'Pitch Black', hex: '#151515' }],
        price: 78, originalPrice: 98, discount: 20, isSale: true, isBest: false, isNew: true,
        query: 'woman high rise flare bell bottom jeans denim studio model'
      },
      {
        id: 'w-jn-05',
        name: 'Slim Straight Ankle Crop Denim Jeans',
        color: { name: 'Classic Mid Wash', hex: '#587A9C' },
        altColors: [{ name: 'Dark Wash', hex: '#23395B' }, { name: 'Pure White', hex: '#F9F9F9' }],
        price: 58, originalPrice: 72, discount: 19, isSale: false, isBest: true, isNew: false,
        query: 'woman slim straight ankle crop jeans studio model'
      },
      {
        id: 'w-jn-06',
        name: 'Sculpting High-Stretch Skinny Denim Jeans',
        color: { name: 'Washed Charcoal Black', hex: '#26282B' },
        altColors: [{ name: 'Deep Indigo', hex: '#1F3354' }, { name: 'Medium Blue', hex: '#4F7296' }],
        price: 54, originalPrice: 68, discount: 21, isSale: true, isBest: true, isNew: false,
        query: 'woman high waist skinny jeans denim studio model'
      },
      {
        id: 'w-jn-07',
        name: 'Curved Barrel-Leg Relaxed Denim Pants',
        color: { name: 'Ecru Natural Off-White', hex: '#EDE8DC' },
        altColors: [{ name: 'Light Blue', hex: '#87AECF' }, { name: 'Faded Khaki', hex: '#7D8471' }],
        price: 82, originalPrice: 105, discount: 22, isSale: true, isBest: false, isNew: true,
        query: 'woman barrel leg curved denim jeans studio model'
      },
      {
        id: 'w-jn-08',
        name: 'High-Waist Bootcut Slim Flared Jeans',
        color: { name: 'Deep Ocean Blue', hex: '#2C496A' },
        altColors: [{ name: 'Stonewash', hex: '#6789AC' }, { name: 'Black', hex: '#181818' }],
        price: 66, originalPrice: 82, discount: 20, isSale: false, isBest: false, isNew: false,
        query: 'woman high rise bootcut jeans denim studio model'
      },
      {
        id: 'w-jn-09',
        name: 'Distressed Knee Boyfriend Relaxed Jeans',
        color: { name: 'Sun-Bleached Light Wash', hex: '#94B4D1' },
        altColors: [{ name: 'Medium Wash', hex: '#56789A' }, { name: 'Grey Acid Wash', hex: '#5A6065' }],
        price: 64, originalPrice: 80, discount: 20, isSale: true, isBest: false, isNew: false,
        query: 'woman distressed ripped boyfriend jeans denim studio model'
      },
      {
        id: 'w-jn-10',
        name: 'Front-Pleated Wide-Leg Trouser Jeans',
        color: { name: 'Raw Clean Dark Denim', hex: '#182942' },
        altColors: [{ name: 'Mid Indigo', hex: '#456686' }, { name: 'Bone White', hex: '#F2EFE9' }],
        price: 84, originalPrice: 110, discount: 24, isSale: true, isBest: true, isNew: true,
        query: 'woman pleated wide leg denim trouser jeans studio model'
      },
      {
        id: 'w-jn-11',
        name: 'Split-Hem Straight Leg High-Rise Jeans',
        color: { name: 'Washed Grey Denim', hex: '#4F545B' },
        altColors: [{ name: 'Light Blue', hex: '#82A5C5' }, { name: 'Jet Black', hex: '#121212' }],
        price: 69, originalPrice: 88, discount: 22, isSale: false, isBest: false, isNew: true,
        query: 'woman split hem straight leg denim jeans studio model'
      },
      {
        id: 'w-jn-12',
        name: 'Utility Cargo Pocket Relaxed Denim Jeans',
        color: { name: 'Vintage Washed Blue', hex: '#6082A3' },
        altColors: [{ name: 'Olive Denim', hex: '#55604C' }, { name: 'Chalk White', hex: '#F5F5F0' }],
        price: 76, originalPrice: 95, discount: 20, isSale: true, isBest: false, isNew: true,
        query: 'woman cargo pocket denim jeans relaxed studio model'
      },
      {
        id: 'w-jn-13',
        name: 'Paperbag Belted High-Waist Mom Jeans',
        color: { name: 'Soft Khaki Denim', hex: '#8A826B' },
        altColors: [{ name: 'Stonewash Blue', hex: '#6C8EAF' }, { name: 'Chambray', hex: '#A3B8CC' }],
        price: 59, originalPrice: 75, discount: 21, isSale: false, isBest: false, isNew: false,
        query: 'woman paperbag waist denim jeans belted studio model'
      },
      {
        id: 'w-jn-14',
        name: 'Cigarette Slim Ankle Denim Jeans',
        color: { name: 'Midnight Raw Indigo', hex: '#15243B' },
        altColors: [{ name: 'Mid Vintage', hex: '#4A6C8E' }, { name: 'Optical Black', hex: '#1B1B1B' }],
        price: 65, originalPrice: 82, discount: 21, isSale: true, isBest: false, isNew: false,
        query: 'woman cigarette slim fit denim jeans studio model'
      },
      {
        id: 'w-jn-15',
        name: 'Two-Tone Panelled Straight Leg Jeans',
        color: { name: 'Two-Tone Indigo Contrast', hex: '#3E5C7B' },
        altColors: [{ name: 'Monochrome Grey', hex: '#3E4247' }, { name: 'Light & Mid Blue', hex: '#7799BA' }],
        price: 80, originalPrice: 100, discount: 20, isSale: false, isBest: false, isNew: true,
        query: 'woman two tone panelled denim jeans straight leg studio model'
      },
      {
        id: 'w-jn-16',
        name: 'High-Rise Slit Flare Denim Trousers',
        color: { name: 'Pitch Black Denim', hex: '#111111' },
        altColors: [{ name: 'Deep Indigo', hex: '#1E3250' }, { name: 'Vintage Stone', hex: '#6283A4' }],
        price: 72, originalPrice: 90, discount: 20, isSale: true, isBest: true, isNew: false,
        query: 'woman black flare slit denim pants studio model'
      },
      {
        id: 'w-jn-17',
        name: 'Slouchy Low-Slung Baggy Denim Jeans',
        color: { name: 'Vintage Light Blue', hex: '#86A7C6' },
        altColors: [{ name: 'Medium Wash', hex: '#527599' }, { name: 'Washed Grey', hex: '#4B5056' }],
        price: 75, originalPrice: 95, discount: 21, isSale: true, isBest: false, isNew: true,
        query: 'woman baggy low rise loose denim jeans studio model'
      },
      {
        id: 'w-jn-18',
        name: 'Sailor Multi-Button High-Waist Wide Jeans',
        color: { name: 'Sailor Dark Blue', hex: '#1A2D48' },
        altColors: [{ name: 'Ecru', hex: '#ECE6D9' }, { name: 'Mid Wash', hex: '#4E7092' }],
        price: 79, originalPrice: 99, discount: 20, isSale: false, isBest: false, isNew: false,
        query: 'woman sailor button wide leg denim jeans studio model'
      },
      {
        id: 'w-jn-19',
        name: 'Raw Hem Straight Cropped Denim Jeans',
        color: { name: 'Authentic Medium Stonewash', hex: '#507191' },
        altColors: [{ name: 'Light Wash', hex: '#83A4C4' }, { name: 'Washed Black', hex: '#2A2C30' }],
        price: 61, originalPrice: 76, discount: 20, isSale: true, isBest: true, isNew: false,
        query: 'woman raw hem straight cropped jeans denim studio model'
      },
      {
        id: 'w-jn-20',
        name: 'Tailored Clean Denim Trouser with Pressed Crease',
        color: { name: 'Inky Dark Wash', hex: '#142033' },
        altColors: [{ name: 'Medium Blue', hex: '#446484' }, { name: 'Chalk Ecru', hex: '#EDE8DB' }],
        price: 85, originalPrice: 110, discount: 23, isSale: true, isBest: false, isNew: true,
        query: 'woman tailored denim trousers pressed crease studio model'
      }
    ]
  },

  // ===================== CO-ORDS (20) =====================
  {
    category: 'Co-ords',
    dir: 'co-ords',
    items: [
      {
        id: 'w-cd-01',
        name: 'Tailored Linen Vest & Wide-Leg Trouser Set',
        color: { name: 'Natural Sand', hex: '#CDBCA9' },
        altColors: [{ name: 'Sage Green', hex: '#879782' }, { name: 'Classic Black', hex: '#1F1F1F' }],
        price: 88, originalPrice: 115, discount: 23, isSale: true, isBest: true, isNew: true,
        query: 'woman tailored linen vest waistcoat and wide leg pants set co-ord studio model'
      },
      {
        id: 'w-cd-02',
        name: 'Oversized Linen Blazer & Pleated Shorts Set',
        color: { name: 'Muted Sage', hex: '#8A9B85' },
        altColors: [{ name: 'Butter Cream', hex: '#EDE8D5' }, { name: 'Terracotta', hex: '#BD664B' }],
        price: 92, originalPrice: 120, discount: 23, isSale: true, isBest: false, isNew: true,
        query: 'woman linen blazer and matching shorts set co-ord studio model'
      },
      {
        id: 'w-cd-03',
        name: 'Ribbed Knit Crop Top & Wide Pant Lounge Set',
        color: { name: 'Warm Camel', hex: '#B58D67' },
        altColors: [{ name: 'Oatmeal Heather', hex: '#DBD2C4' }, { name: 'Charcoal', hex: '#373A40' }],
        price: 68, originalPrice: 85, discount: 20, isSale: false, isBest: true, isNew: false,
        query: 'woman ribbed knit matching lounge set top and pants co-ord studio model'
      },
      {
        id: 'w-cd-04',
        name: 'Cropped Hoodie & High-Waist Jogger Tracksuit Set',
        color: { name: 'Mustard Yellow', hex: '#E3A824' },
        altColors: [{ name: 'Grey Melange', hex: '#9E9E9E' }, { name: 'Forest Green', hex: '#2A4D3B' }],
        price: 72, originalPrice: 90, discount: 20, isSale: true, isBest: true, isNew: false,
        query: 'woman yellow cropped hoodie and matching joggers sweatpants set co-ord studio model'
      },
      {
        id: 'w-cd-05',
        name: 'Silk Satin Halter Top & Flowing Maxi Skirt Set',
        color: { name: 'Champagne Silk', hex: '#F0E2C8' },
        altColors: [{ name: 'Rose Gold', hex: '#B76E79' }, { name: 'Emerald', hex: '#0B5336' }],
        price: 98, originalPrice: 130, discount: 25, isSale: true, isBest: false, isNew: true,
        query: 'woman satin top and matching maxi skirt set two piece co-ord studio model'
      },
      {
        id: 'w-cd-06',
        name: 'Cotton Poplin Striped Shirt & Boxer Shorts Set',
        color: { name: 'Sky Blue Stripe', hex: '#87B0D1' },
        altColors: [{ name: 'Pink Stripe', hex: '#E4A4B5' }, { name: 'Sage Stripe', hex: '#93A892' }],
        price: 56, originalPrice: 70, discount: 20, isSale: false, isBest: true, isNew: true,
        query: 'woman striped poplin button up shirt and shorts matching set co-ord studio model'
      },
      {
        id: 'w-cd-07',
        name: 'Tweed Bouclé Cropped Jacket & Mini Skirt Set',
        color: { name: 'Black & White Houndstooth', hex: '#2C2C2C' },
        altColors: [{ name: 'Pastel Pink', hex: '#E6B8C2' }, { name: 'Navy & Cream', hex: '#1B263B' }],
        price: 110, originalPrice: 145, discount: 24, isSale: true, isBest: false, isNew: false,
        query: 'woman tweed cropped jacket and matching mini skirt set co-ord studio model'
      },
      {
        id: 'w-cd-08',
        name: 'Textured Bouclé Sleeveless Vest & Trousers Set',
        color: { name: 'Oatmeal Cream', hex: '#E8E1CE' },
        altColors: [{ name: 'Charcoal', hex: '#3E4146' }, { name: 'Soft Camel', hex: '#C29B70' }],
        price: 85, originalPrice: 110, discount: 23, isSale: true, isBest: false, isNew: true,
        query: 'woman boucle vest and tailored wide leg pants set co-ord studio model'
      },
      {
        id: 'w-cd-09',
        name: 'Floral Chiffon Ruffle Crop Top & Tiered Skirt Set',
        color: { name: 'Blush Floral Print', hex: '#DCACB6' },
        altColors: [{ name: 'Periwinkle', hex: '#8F99D8' }, { name: 'Golden Sunflower', hex: '#E8BA4F' }],
        price: 79, originalPrice: 98, discount: 19, isSale: false, isBest: false, isNew: true,
        query: 'woman floral crop top and tiered maxi skirt set two piece co-ord studio model'
      },
      {
        id: 'w-cd-10',
        name: 'Organic Modal Relaxed Boxy Tee & Shorts Set',
        color: { name: 'Muted Terracotta', hex: '#BD6A52' },
        altColors: [{ name: 'Olive Green', hex: '#586A50' }, { name: 'Cloud White', hex: '#FAFAFA' }],
        price: 49, originalPrice: 62, discount: 21, isSale: true, isBest: true, isNew: false,
        query: 'woman modal t-shirt and shorts lounge matching set co-ord studio model'
      },
      {
        id: 'w-cd-11',
        name: 'Double-Breasted Blazer & Tailored Pants Suit Set',
        color: { name: 'Midnight Navy', hex: '#162238' },
        altColors: [{ name: 'Pebble Grey', hex: '#9E9EA0' }, { name: 'Burgundy', hex: '#631828' }],
        price: 125, originalPrice: 165, discount: 24, isSale: true, isBest: true, isNew: false,
        query: 'woman tailored blazer and trousers suit two piece set co-ord studio model'
      },
      {
        id: 'w-cd-12',
        name: 'Ribbed Cardigan & Bodycon Midi Skirt Knit Set',
        color: { name: 'Espresso Brown', hex: '#3E2B21' },
        altColors: [{ name: 'Taupe Beige', hex: '#AC9C8D' }, { name: 'Dark Teal', hex: '#194A53' }],
        price: 78, originalPrice: 98, discount: 20, isSale: false, isBest: true, isNew: true,
        query: 'woman ribbed knit cardigan and matching midi skirt set co-ord studio model'
      },
      {
        id: 'w-cd-13',
        name: 'Terry Towelling Resort Camp Collar Shirt & Shorts',
        color: { name: 'Mint Green', hex: '#84BFA4' },
        altColors: [{ name: 'Coral Pink', hex: '#EB8C84' }, { name: 'Coconut White', hex: '#FDFBF7' }],
        price: 64, originalPrice: 80, discount: 20, isSale: true, isBest: false, isNew: true,
        query: 'woman terry towel shirt and shorts matching resort set co-ord studio model'
      },
      {
        id: 'w-cd-14',
        name: 'Cutout Wrap Top & High-Waist Palazzo Trouser Set',
        color: { name: 'Burnt Orange', hex: '#BA5227' },
        altColors: [{ name: 'Deep Plum', hex: '#4B2245' }, { name: 'Onyx Black', hex: '#171717' }],
        price: 89, originalPrice: 115, discount: 23, isSale: true, isBest: false, isNew: false,
        query: 'woman wrap crop top and palazzo pants matching set co-ord studio model'
      },
      {
        id: 'w-cd-15',
        name: 'Crinkled Cotton Button Shirt & Wide-Leg Pant Duo',
        color: { name: 'Buttercream Ecru', hex: '#EBE3D0' },
        altColors: [{ name: 'Muted Rose', hex: '#C28F97' }, { name: 'Chambray', hex: '#7799BB' }],
        price: 69, originalPrice: 88, discount: 22, isSale: false, isBest: true, isNew: false,
        query: 'woman crinkled cotton shirt and wide leg trousers matching set co-ord studio model'
      },
      {
        id: 'w-cd-16',
        name: 'Utilitarian Belted Safari Romper / Jumpsuit Set',
        color: { name: 'Khaki Olive', hex: '#5E6B52' },
        altColors: [{ name: 'Desert Beige', hex: '#C4B197' }, { name: 'Washed Black', hex: '#2A2C2F' }],
        price: 74, originalPrice: 95, discount: 22, isSale: true, isBest: false, isNew: true,
        query: 'woman utility belted jumpsuit romper olive green studio model'
      },
      {
        id: 'w-cd-17',
        name: 'Cropped Trench Jacket & Pleated Tennis Skirt Set',
        color: { name: 'British Tan', hex: '#A8794B' },
        altColors: [{ name: 'Stone Grey', hex: '#A6A6A6' }, { name: 'Navy', hex: '#19263E' }],
        price: 95, originalPrice: 125, discount: 24, isSale: true, isBest: false, isNew: true,
        query: 'woman cropped jacket and pleated skirt matching set co-ord studio model'
      },
      {
        id: 'w-cd-18',
        name: 'Sleek Scoop-Neck Top & Slit Satin Skirt Duo',
        color: { name: 'Noir Black', hex: '#141414' },
        altColors: [{ name: 'Burgundy', hex: '#6B1E2E' }, { name: 'Ivory', hex: '#FAF7EE' }],
        price: 76, originalPrice: 96, discount: 21, isSale: false, isBest: true, isNew: false,
        query: 'woman black top and satin midi skirt matching set two piece co-ord studio model'
      },
      {
        id: 'w-cd-19',
        name: 'Crochet Knit Halter Top & Fringed Beach Skirt Set',
        color: { name: 'Boho Ecru', hex: '#E6DECE' },
        altColors: [{ name: 'Terracotta', hex: '#B85E42' }, { name: 'Mustard', hex: '#CCA035' }],
        price: 65, originalPrice: 82, discount: 21, isSale: true, isBest: false, isNew: true,
        query: 'woman crochet knit top and skirt matching beach set co-ord studio model'
      },
      {
        id: 'w-cd-20',
        name: 'Subtle Glen Plaid Oversized Blazer & Shorts Suit',
        color: { name: 'Grey Glen Plaid', hex: '#63656A' },
        altColors: [{ name: 'Brown Plaid', hex: '#6B5849' }, { name: 'Navy Plaid', hex: '#242C3D' }],
        price: 105, originalPrice: 135, discount: 22, isSale: true, isBest: false, isNew: false,
        query: 'woman plaid blazer and matching shorts suit set co-ord studio model'
      }
    ]
  },

  // ===================== ACTIVEWEAR (20) =====================
  {
    category: 'Activewear',
    dir: 'activewear',
    items: [
      {
        id: 'w-aw-01',
        name: 'Seamless Ribbed High-Waist Performance Leggings',
        color: { name: 'Teal Blue', hex: '#1C7285' },
        altColors: [{ name: 'Onyx Black', hex: '#171717' }, { name: 'Dusty Plum', hex: '#6E4864' }],
        price: 44, originalPrice: 55, discount: 20, isSale: false, isBest: true, isNew: true,
        query: 'woman teal blue seamless athletic gym leggings studio model'
      },
      {
        id: 'w-aw-02',
        name: 'Strappy Back Medium-Support Yoga Sports Bra',
        color: { name: 'Dusty Rose', hex: '#BF7C87' },
        altColors: [{ name: 'White', hex: '#FFFFFF' }, { name: 'Charcoal', hex: '#31353D' }],
        price: 32, originalPrice: 40, discount: 20, isSale: true, isBest: true, isNew: false,
        query: 'woman sports bra yoga fitness strappy back studio model'
      },
      {
        id: 'w-aw-03',
        name: 'High-Waist Sculpting 7" Biker Workout Shorts',
        color: { name: 'Pitch Black', hex: '#121212' },
        altColors: [{ name: 'Olive Green', hex: '#4A5B43' }, { name: 'Espresso', hex: '#3D2D26' }],
        price: 30, originalPrice: 38, discount: 21, isSale: false, isBest: true, isNew: false,
        query: 'woman black high waist biker shorts workout activewear studio model'
      },
      {
        id: 'w-aw-04',
        name: 'Full-Zip Lightweight Breathable Running Jacket',
        color: { name: 'Muted Sage', hex: '#7E917A' },
        altColors: [{ name: 'White', hex: '#F7F7F7' }, { name: 'Black', hex: '#1A1A1A' }],
        price: 58, originalPrice: 75, discount: 23, isSale: true, isBest: false, isNew: true,
        query: 'woman full zip athletic running jacket activewear studio model'
      },
      {
        id: 'w-aw-05',
        name: 'Seamless Ribbed Yoga Unitard / Bodysuit',
        color: { name: 'Dark Charcoal', hex: '#2E3238' },
        altColors: [{ name: 'Mocha Brown', hex: '#584338' }, { name: 'Deep Navy', hex: '#19263D' }],
        price: 56, originalPrice: 70, discount: 20, isSale: false, isBest: true, isNew: true,
        query: 'woman seamless yoga unitard jumpsuit activewear studio model'
      },
      {
        id: 'w-aw-06',
        name: 'High-Support Compression Workout Leggings',
        color: { name: 'Midnight Navy', hex: '#16233B' },
        altColors: [{ name: 'Burgundy', hex: '#5E1B29' }, { name: 'Charcoal', hex: '#32363D' }],
        price: 48, originalPrice: 60, discount: 20, isSale: true, isBest: true, isNew: false,
        query: 'woman compression workout leggings navy blue activewear studio model'
      },
      {
        id: 'w-aw-07',
        name: 'Butter-Soft V-Neck Longline Sports Crop Bra',
        color: { name: 'Lavender Mist', hex: '#B5A5C7' },
        altColors: [{ name: 'Sage', hex: '#879782' }, { name: 'Ivory', hex: '#FAF7F0' }],
        price: 34, originalPrice: 42, discount: 19, isSale: false, isBest: false, isNew: true,
        query: 'woman longline sports bra crop top activewear studio model'
      },
      {
        id: 'w-aw-08',
        name: '2-in-1 Flowy Running Shorts with Inner Liner',
        color: { name: 'Coral Sunset', hex: '#DE6B5B' },
        altColors: [{ name: 'Teal', hex: '#26798A' }, { name: 'Black', hex: '#1C1C1C' }],
        price: 32, originalPrice: 40, discount: 20, isSale: true, isBest: false, isNew: false,
        query: 'woman 2 in 1 running shorts flowy gym athletic studio model'
      },
      {
        id: 'w-aw-09',
        name: 'Breathable Racerback Mesh Workout Tank Top',
        color: { name: 'Pure White', hex: '#FFFFFF' },
        altColors: [{ name: 'Heather Grey', hex: '#A3A6AB' }, { name: 'Sky Blue', hex: '#89AFD2' }],
        price: 25, originalPrice: 32, discount: 22, isSale: false, isBest: false, isNew: false,
        query: 'woman athletic workout tank top racerback activewear studio model'
      },
      {
        id: 'w-aw-10',
        name: 'Ultra High-Rise Crossover Flare Yoga Pants',
        color: { name: 'Espresso Brown', hex: '#3B2921' },
        altColors: [{ name: 'Noir Black', hex: '#151515' }, { name: 'Navy', hex: '#1A2942' }],
        price: 48, originalPrice: 62, discount: 23, isSale: true, isBest: true, isNew: true,
        query: 'woman crossover flare yoga pants leggings activewear studio model'
      },
      {
        id: 'w-aw-11',
        name: 'Cropped Half-Zip Fleece Athletic Pullover',
        color: { name: 'Heather Grey', hex: '#94979E' },
        altColors: [{ name: 'Cream', hex: '#EDE8D8' }, { name: 'Olive', hex: '#515E49' }],
        price: 52, originalPrice: 65, discount: 20, isSale: false, isBest: false, isNew: true,
        query: 'woman half zip cropped fleece pullover athletic gym studio model'
      },
      {
        id: 'w-aw-12',
        name: 'Seamless Long-Sleeve Thumbhole Crop Gym Top',
        color: { name: 'Olive Green', hex: '#4F5E48' },
        altColors: [{ name: 'Black', hex: '#1C1C1C' }, { name: 'Dusty Berry', hex: '#773F55' }],
        price: 36, originalPrice: 45, discount: 20, isSale: true, isBest: true, isNew: false,
        query: 'woman seamless long sleeve crop top gym activewear studio model'
      },
      {
        id: 'w-aw-13',
        name: 'Pleated Performance Tennis Workout Skirt',
        color: { name: 'Optic White', hex: '#FAFAFA' },
        altColors: [{ name: 'Navy Blue', hex: '#17233B' }, { name: 'Pale Pink', hex: '#ECC4CD' }],
        price: 38, originalPrice: 48, discount: 21, isSale: false, isBest: true, isNew: true,
        query: 'woman pleated tennis skirt workout athletic studio model'
      },
      {
        id: 'w-aw-14',
        name: 'Sculpting Cross-Waist Seamless Gym Tights',
        color: { name: 'Deep Burgundy', hex: '#581827' },
        altColors: [{ name: 'Charcoal', hex: '#2D3036' }, { name: 'Forest', hex: '#1E4530' }],
        price: 46, originalPrice: 58, discount: 21, isSale: true, isBest: false, isNew: false,
        query: 'woman cross waist compression leggings activewear gym studio model'
      },
      {
        id: 'w-aw-15',
        name: 'Open-Back Studio Ballet Barre Long-Sleeve Top',
        color: { name: 'Pale Blush Pink', hex: '#DFC1C6' },
        altColors: [{ name: 'White', hex: '#FFFFFF' }, { name: 'Black', hex: '#181818' }],
        price: 34, originalPrice: 42, discount: 19, isSale: false, isBest: false, isNew: true,
        query: 'woman open back workout top long sleeve ballet studio model'
      },
      {
        id: 'w-aw-16',
        name: 'Lightweight Packable Windbreaker Running Jacket',
        color: { name: 'Neon Lime & Grey', hex: '#B2D852' },
        altColors: [{ name: 'Sky Blue', hex: '#78A8D1' }, { name: 'Classic Black', hex: '#1A1A1A' }],
        price: 62, originalPrice: 80, discount: 23, isSale: true, isBest: false, isNew: false,
        query: 'woman running windbreaker lightweight athletic jacket studio model'
      },
      {
        id: 'w-aw-17',
        name: 'High-Impact Zip-Front Padded Sports Bra',
        color: { name: 'Classic Black', hex: '#171717' },
        altColors: [{ name: 'Navy', hex: '#1C283E' }, { name: 'White', hex: '#FFFFFF' }],
        price: 36, originalPrice: 46, discount: 22, isSale: true, isBest: true, isNew: false,
        query: 'woman high impact zip front sports bra activewear studio model'
      },
      {
        id: 'w-aw-18',
        name: 'Textured Honeycomb Anti-Cellulite Gym Tights',
        color: { name: 'Cobalt Blue', hex: '#2155CD' },
        altColors: [{ name: 'Black', hex: '#151515' }, { name: 'Grey', hex: '#777A82' }],
        price: 42, originalPrice: 52, discount: 19, isSale: false, isBest: false, isNew: false,
        query: 'woman textured honeycomb gym leggings workout tights studio model'
      },
      {
        id: 'w-aw-19',
        name: 'Thermal Fleece-Lined Outdoor Running Leggings',
        color: { name: 'Midnight Black', hex: '#101010' },
        altColors: [{ name: 'Dark Charcoal', hex: '#2B2E33' }, { name: 'Deep Navy', hex: '#152136' }],
        price: 52, originalPrice: 65, discount: 20, isSale: true, isBest: false, isNew: true,
        query: 'woman running leggings high waist black thermal activewear studio model'
      },
      {
        id: 'w-aw-20',
        name: 'French Terry Relaxed Post-Workout Sweatpants',
        color: { name: 'Oatmeal Melange', hex: '#D2C8B8' },
        altColors: [{ name: 'Heather Grey', hex: '#A1A3A8' }, { name: 'Washed Black', hex: '#26282B' }],
        price: 46, originalPrice: 58, discount: 21, isSale: false, isBest: true, isNew: false,
        query: 'woman french terry relaxed sweatpants joggers activewear studio model'
      }
    ]
  },

  // ===================== OUTERWEAR (20) =====================
  {
    category: 'Outerwear',
    dir: 'outerwear',
    items: [
      {
        id: 'w-ow-01',
        name: 'Double-Breasted Belted Wool-Blend Trench Coat',
        color: { name: 'Camel Tan', hex: '#C29B6E' },
        altColors: [{ name: 'Black', hex: '#1C1C1C' }, { name: 'Stone Beige', hex: '#D6C8B4' }],
        price: 135, originalPrice: 180, discount: 25, isSale: true, isBest: true, isNew: false,
        query: 'woman camel wool trench coat double breasted belted outerwear studio model'
      },
      {
        id: 'w-ow-02',
        name: 'Classic Faux-Leather Biker Moto Jacket',
        color: { name: 'Noir Black', hex: '#141414' },
        altColors: [{ name: 'Dark Burgundy', hex: '#581A25' }, { name: 'Espresso', hex: '#37271F' }],
        price: 89, originalPrice: 115, discount: 23, isSale: true, isBest: true, isNew: false,
        query: 'woman black leather biker moto jacket outerwear fashion studio model'
      },
      {
        id: 'w-ow-03',
        name: 'Oversized Tailored Wool Houndstooth Blazer',
        color: { name: 'Charcoal Houndstooth', hex: '#404347' },
        altColors: [{ name: 'Brown Check', hex: '#655344' }, { name: 'Solid Black', hex: '#1B1B1B' }],
        price: 98, originalPrice: 125, discount: 22, isSale: false, isBest: true, isNew: true,
        query: 'woman houndstooth check oversized wool blazer coat studio model'
      },
      {
        id: 'w-ow-04',
        name: 'Quilted Down Hooded Longline Puffer Coat',
        color: { name: 'Winter Off-White', hex: '#F4EFE6' },
        altColors: [{ name: 'Matte Black', hex: '#1B1C1E' }, { name: 'Sage Green', hex: '#778873' }],
        price: 145, originalPrice: 195, discount: 26, isSale: true, isBest: false, isNew: true,
        query: 'woman longline down quilted puffer coat hooded winter outerwear studio model'
      },
      {
        id: 'w-ow-05',
        name: 'Cozy Teddy Faux-Shearling Cocoon Coat',
        color: { name: 'Warm Almond', hex: '#CBB295' },
        altColors: [{ name: 'Cream', hex: '#EDE3D1' }, { name: 'Mocha', hex: '#5B473B' }],
        price: 112, originalPrice: 140, discount: 20, isSale: false, isBest: true, isNew: false,
        query: 'woman teddy bear shearling faux fur coat outerwear studio model'
      },
      {
        id: 'w-ow-06',
        name: 'Sherpa-Lined Denim Trucker Jacket',
        color: { name: 'Medium Wash Denim', hex: '#507398' },
        altColors: [{ name: 'Washed Black', hex: '#2D3035' }, { name: 'Light Wash', hex: '#81A4C7' }],
        price: 78, originalPrice: 98, discount: 20, isSale: true, isBest: false, isNew: false,
        query: 'woman sherpa lined denim jacket trucker coat studio model'
      },
      {
        id: 'w-ow-07',
        name: 'Single-Breasted Tailored Wool Long Coat',
        color: { name: 'Forest Green', hex: '#1E4631' },
        altColors: [{ name: 'Camel', hex: '#BF9466' }, { name: 'Charcoal', hex: '#373A40' }],
        price: 129, originalPrice: 165, discount: 22, isSale: true, isBest: true, isNew: false,
        query: 'woman tailored wool long coat single breasted elegant outerwear studio model'
      },
      {
        id: 'w-ow-08',
        name: 'Water-Resistant Belted Lightweight Rain Mac',
        color: { name: 'Midnight Navy', hex: '#17243B' },
        altColors: [{ name: 'Khaki Beige', hex: '#BEB09B' }, { name: 'Olive', hex: '#55634B' }],
        price: 94, originalPrice: 120, discount: 22, isSale: false, isBest: false, isNew: true,
        query: 'woman belted rain mac coat waterproof outerwear studio model'
      },
      {
        id: 'w-ow-09',
        name: 'Collarless Minimalist Draped Wrap Coat',
        color: { name: 'Cashmere Grey', hex: '#9E9FA5' },
        altColors: [{ name: 'Oatmeal', hex: '#DFD8C8' }, { name: 'Black', hex: '#181818' }],
        price: 118, originalPrice: 150, discount: 21, isSale: true, isBest: false, isNew: false,
        query: 'woman minimalist draped wrap coat collarless wool outerwear studio model'
      },
      {
        id: 'w-ow-10',
        name: 'Cropped Satin Padded Bomber Jacket',
        color: { name: 'Caramel Bronze', hex: '#A66D43' },
        altColors: [{ name: 'Army Olive', hex: '#4B553F' }, { name: 'Pitch Black', hex: '#161616' }],
        price: 72, originalPrice: 90, discount: 20, isSale: false, isBest: true, isNew: true,
        query: 'woman cropped bomber jacket satin outerwear studio model'
      },
      {
        id: 'w-ow-11',
        name: 'Bouclé Plaid Shacket / Wool Overshirt',
        color: { name: 'Cream & Camel Plaid', hex: '#D6C3AA' },
        altColors: [{ name: 'Grey Plaid', hex: '#777A82' }, { name: 'Navy Plaid', hex: '#212C3F' }],
        price: 68, originalPrice: 85, discount: 20, isSale: true, isBest: false, isNew: true,
        query: 'woman plaid shacket shirt jacket wool outerwear studio model'
      },
      {
        id: 'w-ow-12',
        name: 'Aviator Faux-Leather Shearling Flight Jacket',
        color: { name: 'Dark Brown / Cream Shearling', hex: '#483528' },
        altColors: [{ name: 'Black / White', hex: '#1F1F1F' }, { name: 'Cognac', hex: '#874B2A' }],
        price: 124, originalPrice: 160, discount: 23, isSale: true, isBest: true, isNew: false,
        query: 'woman aviator shearling flight jacket leather coat outerwear studio model'
      },
      {
        id: 'w-ow-13',
        name: 'Wool-Blend Structured Cape Coat with Arm Slits',
        color: { name: 'Burgundy Wine', hex: '#631828' },
        altColors: [{ name: 'Camel', hex: '#C29868' }, { name: 'Black', hex: '#1A1A1A' }],
        price: 115, originalPrice: 145, discount: 21, isSale: false, isBest: false, isNew: true,
        query: 'woman wool cape coat poncho elegant outerwear studio model'
      },
      {
        id: 'w-ow-14',
        name: 'Classic Parka Jacket with Faux-Fur Trim Hood',
        color: { name: 'Military Olive Khaki', hex: '#4B5842' },
        altColors: [{ name: 'Midnight Black', hex: '#1B1C1F' }, { name: 'Deep Navy', hex: '#18243A' }],
        price: 130, originalPrice: 170, discount: 24, isSale: true, isBest: true, isNew: false,
        query: 'woman winter parka jacket faux fur hood coat outerwear studio model'
      },
      {
        id: 'w-ow-15',
        name: 'Double-Faced Cashmere Longline Duster Coat',
        color: { name: 'Pale Biscuit', hex: '#DECBB6' },
        altColors: [{ name: 'Heather Grey', hex: '#9CA0A6' }, { name: 'Noir Black', hex: '#141414' }],
        price: 155, originalPrice: 210, discount: 26, isSale: true, isBest: false, isNew: false,
        query: 'woman long duster coat cashmere wool open front outerwear studio model'
      },
      {
        id: 'w-ow-16',
        name: 'Belted Faux-Leather Longline Trench Coat',
        color: { name: 'Espresso Brown', hex: '#3B2920' },
        altColors: [{ name: 'Jet Black', hex: '#111111' }, { name: 'Oxblood Red', hex: '#521921' }],
        price: 128, originalPrice: 165, discount: 22, isSale: false, isBest: true, isNew: true,
        query: 'woman leather trench coat long belted outerwear studio model'
      },
      {
        id: 'w-ow-17',
        name: 'Boxy Quilted Liner Jacket with Snap Fastening',
        color: { name: 'Muted Olive', hex: '#626F56' },
        altColors: [{ name: 'Off-White', hex: '#F0ECE1' }, { name: 'Dark Navy', hex: '#1C293E' }],
        price: 65, originalPrice: 82, discount: 21, isSale: true, isBest: false, isNew: true,
        query: 'woman quilted liner jacket lightweight outerwear studio model'
      },
      {
        id: 'w-ow-18',
        name: 'Slouchy Fringe-Trim Wool Knit Poncho Wrap',
        color: { name: 'Natural Oatmeal', hex: '#DDD4C4' },
        altColors: [{ name: 'Charcoal Grey', hex: '#444850' }, { name: 'Rust', hex: '#B25A3D' }],
        price: 59, originalPrice: 75, discount: 21, isSale: false, isBest: false, isNew: false,
        query: 'woman knit fringe poncho shawl wrap coat studio model'
      },
      {
        id: 'w-ow-19',
        name: 'Contrast Piping Heritage Wool Blazer',
        color: { name: 'Navy & Ivory Piping', hex: '#16233B' },
        altColors: [{ name: 'Black & Cream', hex: '#1E1E1E' }, { name: 'British Green', hex: '#1A3D28' }],
        price: 95, originalPrice: 120, discount: 21, isSale: true, isBest: false, isNew: true,
        query: 'woman navy blue tailored blazer contrast piping jacket studio model'
      },
      {
        id: 'w-ow-20',
        name: 'Lightweight Packable Featherdown Quilted Vest',
        color: { name: 'Soft Champagne', hex: '#EADBCC' },
        altColors: [{ name: 'Black', hex: '#181818' }, { name: 'Olive Green', hex: '#4F5C46' }],
        price: 54, originalPrice: 68, discount: 21, isSale: false, isBest: true, isNew: false,
        query: 'woman quilted down puffer vest gilet outerwear studio model'
      }
    ]
  },

  // ===================== LINGERIE (20) =====================
  {
    category: 'Lingerie',
    dir: 'lingerie',
    items: [
      {
        id: 'w-lg-01',
        name: 'Mulberry Silk Satin Lace-Trim Nightgown Slip',
        color: { name: 'Dusty Rose', hex: '#D29CA6' },
        altColors: [{ name: 'Noir Black', hex: '#141414' }, { name: 'Champagne', hex: '#EFE2CD' }],
        price: 64, originalPrice: 85, discount: 25, isSale: true, isBest: true, isNew: false,
        query: 'woman silk satin lace chemise nightgown slip sleepwear studio model'
      },
      {
        id: 'w-lg-02',
        name: 'Delicate Floral Lace Triangle Wireless Bralette',
        color: { name: 'Noir Black', hex: '#121212' },
        altColors: [{ name: 'Pure White', hex: '#FFFFFF' }, { name: 'Ruby Wine', hex: '#6E1B29' }],
        price: 28, originalPrice: 36, discount: 22, isSale: false, isBest: true, isNew: true,
        query: 'woman lace triangle wireless bralette lingerie studio model'
      },
      {
        id: 'w-lg-03',
        name: 'Modal Ribbed Cami & Tap Shorts Sleepwear Set',
        color: { name: 'Cloud White', hex: '#F8F9FA' },
        altColors: [{ name: 'Muted Mauve', hex: '#A37E8C' }, { name: 'Charcoal', hex: '#31343B' }],
        price: 42, originalPrice: 52, discount: 19, isSale: true, isBest: true, isNew: false,
        query: 'woman modal camisole and shorts sleepwear pajama set studio model'
      },
      {
        id: 'w-lg-04',
        name: 'Pure Silk Satin Kimono Loungewear Robe',
        color: { name: 'Champagne Pearl', hex: '#F0E2C8' },
        altColors: [{ name: 'Blush Pink', hex: '#E8BCC6' }, { name: 'Midnight', hex: '#172238' }],
        price: 85, originalPrice: 110, discount: 23, isSale: true, isBest: false, isNew: true,
        query: 'woman silk satin kimono robe dressing gown sleepwear studio model'
      },
      {
        id: 'w-lg-05',
        name: 'Satin Button-Down Long-Sleeve Pajama Set',
        color: { name: 'Midnight Navy Piping', hex: '#18243B' },
        altColors: [{ name: 'Emerald', hex: '#0B4A31' }, { name: 'Soft Pink', hex: '#EDB9C4' }],
        price: 68, originalPrice: 88, discount: 23, isSale: true, isBest: true, isNew: false,
        query: 'woman satin button down pajama set long sleeve sleepwear studio model'
      },
      {
        id: 'w-lg-06',
        name: 'Sheer Eyelash Lace Plunge Neck Bodysuit',
        color: { name: 'Burgundy Wine', hex: '#631828' },
        altColors: [{ name: 'Black Lace', hex: '#141414' }, { name: 'Emerald', hex: '#08482F' }],
        price: 48, originalPrice: 60, discount: 20, isSale: false, isBest: false, isNew: true,
        query: 'woman eyelash lace plunge bodysuit teddy lingerie studio model'
      },
      {
        id: 'w-lg-07',
        name: 'Seamless Microfiber Smooth T-Shirt Bra',
        color: { name: 'Nude Almond', hex: '#D2B395' },
        altColors: [{ name: 'Classic Black', hex: '#171717' }, { name: 'White', hex: '#FFFFFF' }],
        price: 34, originalPrice: 42, discount: 19, isSale: false, isBest: true, isNew: false,
        query: 'woman seamless smooth t shirt bra nude lingerie studio model'
      },
      {
        id: 'w-lg-08',
        name: 'Ribbed Cotton Bralette & High-Waist Brief Duo',
        color: { name: 'Oatmeal Heather', hex: '#DDD4C4' },
        altColors: [{ name: 'Soft Sage', hex: '#879782' }, { name: 'Charcoal', hex: '#2F3238' }],
        price: 36, originalPrice: 45, discount: 20, isSale: true, isBest: true, isNew: false,
        query: 'woman ribbed cotton bralette and high waist briefs set lingerie studio model'
      },
      {
        id: 'w-lg-09',
        name: 'Satin Bias-Cut Midi Slip Loungewear Dress',
        color: { name: 'Sage Green Silk', hex: '#7E917A' },
        altColors: [{ name: 'Rose', hex: '#CC8B98' }, { name: 'Onyx', hex: '#161616' }],
        price: 58, originalPrice: 75, discount: 23, isSale: true, isBest: false, isNew: true,
        query: 'woman satin bias cut slip nightdress sleepwear studio model'
      },
      {
        id: 'w-lg-10',
        name: 'French Floral Lace Balconette Underwire Bra',
        color: { name: 'Emerald Silk', hex: '#0A5236' },
        altColors: [{ name: 'Noir Black', hex: '#141414' }, { name: 'Bordeaux', hex: '#581827' }],
        price: 44, originalPrice: 55, discount: 20, isSale: false, isBest: false, isNew: false,
        query: 'woman lace underwire balconette bra emerald lingerie studio model'
      },
      {
        id: 'w-lg-11',
        name: 'Embroidered Floral Tulle Soft-Cup Bralette',
        color: { name: 'Lilac Whisper', hex: '#C2ADC7' },
        altColors: [{ name: 'Blush', hex: '#ECC4CD' }, { name: 'Ivory', hex: '#FAF7EE' }],
        price: 32, originalPrice: 40, discount: 20, isSale: true, isBest: false, isNew: true,
        query: 'woman embroidered tulle floral soft cup bralette lingerie studio model'
      },
      {
        id: 'w-lg-12',
        name: 'Washed Silk Notch Collar Shortie Pajama Set',
        color: { name: 'Buttercream Ecru', hex: '#EBE2CC' },
        altColors: [{ name: 'Sky Blue', hex: '#8FB4D4' }, { name: 'Navy', hex: '#1A263D' }],
        price: 59, originalPrice: 75, discount: 21, isSale: false, isBest: true, isNew: true,
        query: 'woman silk short sleeve short pyjama pajama set sleepwear studio model'
      },
      {
        id: 'w-lg-13',
        name: 'Lace-Trim Satin V-Neck Camisole Cami',
        color: { name: 'Midnight Noir', hex: '#131313' },
        altColors: [{ name: 'Wine Red', hex: '#631828' }, { name: 'Pearly White', hex: '#FDFBF7' }],
        price: 30, originalPrice: 38, discount: 21, isSale: true, isBest: false, isNew: false,
        query: 'woman lace trim satin camisole top black lingerie studio model'
      },
      {
        id: 'w-lg-14',
        name: 'Breathable Bamboo Modal Sleep Romper Onesie',
        color: { name: 'Slate Grey', hex: '#707784' },
        altColors: [{ name: 'Blush', hex: '#DEB5BF' }, { name: 'Olive', hex: '#55634E' }],
        price: 45, originalPrice: 58, discount: 22, isSale: false, isBest: false, isNew: true,
        query: 'woman modal sleep romper loungewear onesie studio model'
      },
      {
        id: 'w-lg-15',
        name: 'Floor-Length Silky Loungewear Dressing Gown',
        color: { name: 'Blush Rosewater', hex: '#E2B1BC' },
        altColors: [{ name: 'Champagne', hex: '#EDE0C8' }, { name: 'Navy', hex: '#19243A' }],
        price: 92, originalPrice: 120, discount: 23, isSale: true, isBest: true, isNew: false,
        query: 'woman long silk satin dressing gown robe sleepwear studio model'
      },
      {
        id: 'w-lg-16',
        name: 'Scalloped Floral Lace Halter Teddy Romper',
        color: { name: 'Ruby Red', hex: '#9E182B' },
        altColors: [{ name: 'Black', hex: '#141414' }, { name: 'White', hex: '#FFFFFF' }],
        price: 46, originalPrice: 58, discount: 21, isSale: false, isBest: false, isNew: true,
        query: 'woman red floral lace halter teddy bodysuit lingerie studio model'
      },
      {
        id: 'w-lg-17',
        name: 'Seamless Smoothing High-Waist Shaper Brief',
        color: { name: 'Almond Beige', hex: '#CCAFA0' },
        altColors: [{ name: 'Black', hex: '#161616' }, { name: 'Warm Mocha', hex: '#87695B' }],
        price: 26, originalPrice: 32, discount: 19, isSale: true, isBest: true, isNew: false,
        query: 'woman seamless high waist shaping briefs underwear lingerie studio model'
      },
      {
        id: 'w-lg-18',
        name: 'Organic Cotton Eyelet Trim Nightie Sundress',
        color: { name: 'Vintage White', hex: '#F7F5EE' },
        altColors: [{ name: 'Soft Butter', hex: '#FDF0CD' }, { name: 'Pastel Blue', hex: '#9ABDD9' }],
        price: 48, originalPrice: 60, discount: 20, isSale: false, isBest: false, isNew: true,
        query: 'woman cotton nightie nightgown eyelet vintage sleepwear studio model'
      },
      {
        id: 'w-lg-19',
        name: 'Plush Velvet Robe with Satin Contrast Piping',
        color: { name: 'Deep Royal Plum', hex: '#4B1842' },
        altColors: [{ name: 'Emerald', hex: '#0B472F' }, { name: 'Midnight', hex: '#152136' }],
        price: 88, originalPrice: 115, discount: 23, isSale: true, isBest: false, isNew: false,
        query: 'woman velvet loungewear robe dressing gown piping studio model'
      },
      {
        id: 'w-lg-20',
        name: 'Whisper-Light Tulle Bralette & Bikini Panty Set',
        color: { name: 'Powder Blue Tulle', hex: '#94BED4' },
        altColors: [{ name: 'Soft Mauve', hex: '#A37D8B' }, { name: 'Classic Black', hex: '#191919' }],
        price: 38, originalPrice: 48, discount: 21, isSale: false, isBest: true, isNew: true,
        query: 'woman sheer tulle bralette and matching panties set lingerie studio model'
      }
    ]
  },

  // ===================== PLUS SIZE (20) =====================
  {
    category: 'Plus Size',
    dir: 'plus-size',
    items: [
      {
        id: 'w-ps-01',
        name: 'Curve Floral Belted Wrap Midi Dress',
        color: { name: 'Blush Floral Print', hex: '#DCAEB7' },
        altColors: [{ name: 'Navy Floral', hex: '#1B263B' }, { name: 'Emerald Floral', hex: '#0F5438' }],
        price: 76, originalPrice: 95, discount: 20, isSale: true, isBest: true, isNew: false,
        query: 'plus size woman floral wrap midi dress curve model studio'
      },
      {
        id: 'w-ps-02',
        name: 'Curve Tailored Double-Breasted Wool Blazer',
        color: { name: 'Camel Tan', hex: '#C29B6E' },
        altColors: [{ name: 'Black', hex: '#171717' }, { name: 'Houndstooth', hex: '#444850' }],
        price: 98, originalPrice: 125, discount: 22, isSale: false, isBest: true, isNew: true,
        query: 'plus size woman tailored blazer jacket curve model studio'
      },
      {
        id: 'w-ps-03',
        name: 'Plus High-Rise Sculpting Stretch Skinny Jeans',
        color: { name: 'Dark Indigo Rinse', hex: '#1C2E4D' },
        altColors: [{ name: 'Medium Wash', hex: '#4B6B8B' }, { name: 'Jet Black', hex: '#141414' }],
        price: 68, originalPrice: 85, discount: 20, isSale: true, isBest: true, isNew: false,
        query: 'plus size woman high waist skinny denim jeans curve model studio'
      },
      {
        id: 'w-ps-04',
        name: 'Curve Pleated Satin Flutter-Sleeve Maxi Dress',
        color: { name: 'Emerald Green', hex: '#0B5336' },
        altColors: [{ name: 'Ruby Wine', hex: '#631828' }, { name: 'Midnight', hex: '#162238' }],
        price: 110, originalPrice: 145, discount: 24, isSale: true, isBest: false, isNew: true,
        query: 'plus size woman emerald green satin maxi evening dress curve model studio'
      },
      {
        id: 'w-ps-05',
        name: 'Plus Size Wide-Leg Linen High-Waist Trousers',
        color: { name: 'Natural Ecru', hex: '#ECE6D9' },
        altColors: [{ name: 'Sage Green', hex: '#778873' }, { name: 'Navy', hex: '#18243A' }],
        price: 62, originalPrice: 78, discount: 21, isSale: false, isBest: true, isNew: false,
        query: 'plus size woman wide leg linen pants trousers curve model studio'
      },
      {
        id: 'w-ps-06',
        name: 'Curve Chunky Fisherman Knit Cowl-Neck Sweater',
        color: { name: 'Oatmeal Melange', hex: '#DFD7C7' },
        altColors: [{ name: 'Warm Camel', hex: '#BA946C' }, { name: 'Burgundy', hex: '#581827' }],
        price: 68, originalPrice: 85, discount: 20, isSale: true, isBest: false, isNew: true,
        query: 'plus size woman chunky knit sweater pullover curve model studio'
      },
      {
        id: 'w-ps-07',
        name: 'Plus Size Drape-Front Belted Wool Wrap Coat',
        color: { name: 'Charcoal Grey', hex: '#3B3E45' },
        altColors: [{ name: 'Camel Tan', hex: '#BD9364' }, { name: 'Black', hex: '#1A1A1A' }],
        price: 135, originalPrice: 175, discount: 23, isSale: true, isBest: true, isNew: false,
        query: 'plus size woman wool wrap coat trench curve model studio'
      },
      {
        id: 'w-ps-08',
        name: 'Curve Square-Neck Ribbed Bodycon Midi Dress',
        color: { name: 'Classic Black', hex: '#181818' },
        altColors: [{ name: 'Chocolate Brown', hex: '#3E2A20' }, { name: 'Forest Green', hex: '#1B4731' }],
        price: 58, originalPrice: 72, discount: 19, isSale: false, isBest: true, isNew: false,
        query: 'plus size woman square neck ribbed midi dress black curve model studio'
      },
      {
        id: 'w-ps-09',
        name: 'Plus Size Crisp Cotton Striped Poplin Shirt',
        color: { name: 'Sky Blue Stripe', hex: '#82A7C9' },
        altColors: [{ name: 'Pure White', hex: '#FFFFFF' }, { name: 'Pink Stripe', hex: '#E5A5B5' }],
        price: 48, originalPrice: 60, discount: 20, isSale: true, isBest: false, isNew: true,
        query: 'plus size woman striped button down shirt poplin curve model studio'
      },
      {
        id: 'w-ps-10',
        name: 'Curve High-Waist Straight Leg Mom Jeans',
        color: { name: 'Light Vintage Wash', hex: '#7FA2C2' },
        altColors: [{ name: 'Medium Stonewash', hex: '#4F7296' }, { name: 'Washed Black', hex: '#2A2C30' }],
        price: 65, originalPrice: 82, discount: 21, isSale: false, isBest: true, isNew: false,
        query: 'plus size woman high waist mom jeans denim curve model studio'
      },
      {
        id: 'w-ps-11',
        name: 'Plus Size Velvet Wrap Cocktail Midi Dress',
        color: { name: 'Burgundy Wine Velvet', hex: '#5E1524' },
        altColors: [{ name: 'Emerald Velvet', hex: '#0B472F' }, { name: 'Black Velvet', hex: '#121212' }],
        price: 88, originalPrice: 115, discount: 23, isSale: true, isBest: false, isNew: true,
        query: 'plus size woman velvet wrap cocktail midi dress curve model studio'
      },
      {
        id: 'w-ps-12',
        name: 'Curve Ribbed Cardigan & Wide Pant Lounge Set',
        color: { name: 'Warm Mocha', hex: '#87695B' },
        altColors: [{ name: 'Oatmeal', hex: '#DDD4C4' }, { name: 'Charcoal', hex: '#31343B' }],
        price: 74, originalPrice: 95, discount: 22, isSale: true, isBest: true, isNew: false,
        query: 'plus size woman ribbed knit lounge set top and pants curve model studio'
      },
      {
        id: 'w-ps-13',
        name: 'Plus Size Tiered Smocked Bohemian Maxi Dress',
        color: { name: 'Terracotta Rust', hex: '#C25D41' },
        altColors: [{ name: 'Olive Green', hex: '#586A50' }, { name: 'Mustard', hex: '#D29C28' }],
        price: 79, originalPrice: 98, discount: 19, isSale: false, isBest: false, isNew: true,
        query: 'plus size woman tiered bohemian maxi dress curve model studio'
      },
      {
        id: 'w-ps-14',
        name: 'Curve High-Waist Seamless Workout Leggings',
        color: { name: 'Plum Berry', hex: '#632A4C' },
        altColors: [{ name: 'Onyx Black', hex: '#171717' }, { name: 'Teal Blue', hex: '#196B7D' }],
        price: 44, originalPrice: 55, discount: 20, isSale: true, isBest: true, isNew: false,
        query: 'plus size woman athletic workout leggings gym activewear curve model studio'
      },
      {
        id: 'w-ps-15',
        name: 'Plus Size Faux-Leather Biker Moto Jacket',
        color: { name: 'Pitch Black', hex: '#151515' },
        altColors: [{ name: 'Cognac Brown', hex: '#7A4325' }, { name: 'Dark Cherry', hex: '#541A24' }],
        price: 92, originalPrice: 120, discount: 23, isSale: true, isBest: false, isNew: true,
        query: 'plus size woman faux leather biker moto jacket curve model studio'
      },
      {
        id: 'w-ps-16',
        name: 'Curve Satin Cowl-Neck Bias-Cut Slip Midi Dress',
        color: { name: 'Rose Gold Satin', hex: '#B8727E' },
        altColors: [{ name: 'Champagne', hex: '#F0E2C8' }, { name: 'Black', hex: '#181818' }],
        price: 68, originalPrice: 85, discount: 20, isSale: false, isBest: true, isNew: false,
        query: 'plus size woman satin cowl neck slip dress curve model studio'
      },
      {
        id: 'w-ps-17',
        name: 'Plus Size Flared Bootcut Trouser Jeans',
        color: { name: 'Deep Midnight Navy', hex: '#15243B' },
        altColors: [{ name: 'Medium Wash', hex: '#4B6B8B' }, { name: 'Black', hex: '#171717' }],
        price: 72, originalPrice: 90, discount: 20, isSale: true, isBest: false, isNew: false,
        query: 'plus size woman flare bootcut jeans denim curve model studio'
      },
      {
        id: 'w-ps-18',
        name: 'Curve Broderie Eyelet Cotton Peplum Blouse',
        color: { name: 'Optic White', hex: '#FAFAFA' },
        altColors: [{ name: 'Sky Blue', hex: '#8CB2D4' }, { name: 'Soft Sage', hex: '#879782' }],
        price: 52, originalPrice: 65, discount: 20, isSale: false, isBest: false, isNew: true,
        query: 'plus size woman white eyelet peplum blouse cotton curve model studio'
      },
      {
        id: 'w-ps-19',
        name: 'Plus Size Quilted Longline Winter Puffer Coat',
        color: { name: 'Muted Olive Green', hex: '#58684F' },
        altColors: [{ name: 'Black', hex: '#1A1A1A' }, { name: 'Cream', hex: '#ECE5D6' }],
        price: 139, originalPrice: 180, discount: 23, isSale: true, isBest: true, isNew: false,
        query: 'plus size woman longline winter puffer coat curve model studio'
      },
      {
        id: 'w-ps-20',
        name: 'Curve Off-Shoulder Formal Crepe Gown',
        color: { name: 'Midnight Navy Crepe', hex: '#142036' },
        altColors: [{ name: 'Burgundy', hex: '#5A1624' }, { name: 'Classic Black', hex: '#161616' }],
        price: 125, originalPrice: 165, discount: 24, isSale: true, isBest: false, isNew: true,
        query: 'plus size woman off shoulder formal evening gown curve model studio'
      }
    ]
  }
];

async function main() {
  console.log('Starting Women catalog builder...');

  const verifiedProducts = [];

  for (const catGroup of CATALOG_DEF) {
    console.log(`\n=== Processing Category: ${catGroup.category} (20 items) ===`);
    const catDir = path.join('public/assets/women', catGroup.dir);
    if (!fs.existsSync(catDir)) fs.mkdirSync(catDir, { recursive: true });

    for (let i = 0; i < catGroup.items.length; i++) {
      const item = catGroup.items[i];
      const targetRelPath = `/assets/women/${catGroup.dir}/${item.id}.jpg`;
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

      // If still not saved, fallback to a reliable curated women's fashion photo
      if (!imageSaved) {
        console.log(`  -> Using verified fashion fallback for ${item.id}`);
        // Fallback fashion image
        const fallbackUrl = 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=600&q=80';
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
      if (catGroup.category === 'Plus Size') {
        // Also map to primary garment subcategory
        if (item.name.includes('Dress') || item.name.includes('Gown')) subcats.push('Dresses');
        else if (item.name.includes('Blazer') || item.name.includes('Coat') || item.name.includes('Jacket') || item.name.includes('Parka')) subcats.push('Outerwear');
        else if (item.name.includes('Jeans')) subcats.push('Jeans');
        else if (item.name.includes('Blouse') || item.name.includes('Shirt') || item.name.includes('Sweater')) subcats.push('Tops');
        else if (item.name.includes('Set')) subcats.push('Co-ords');
        else if (item.name.includes('Leggings')) subcats.push('Activewear');
      }

      const sizes = catGroup.category === 'Plus Size'
        ? ['1X', '2X', '3X', '4X', '14W', '18W']
        : ['XS', 'S', 'M', 'L', 'XL'];

      const colorList = [
        item.color,
        ...(item.altColors || [])
      ];

      const product = {
        id: item.id,
        name: item.name,
        slug: slug,
        category: 'women',
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
        description: `Premium women's ${item.name.toLowerCase()} featuring thoughtful tailoring, soft breathable fabrics, and effortless elegance for everyday and elevated occasions.`,
        details: [
          'Thoughtfully tailored for all-day comfort and natural silhouette',
          'Crafted from ethically sourced, breathable premium textiles',
          'Reinforced precision stitching and durable hem finish',
          'Pre-shrunk to retain shape, drape, and color vibrancy wash after wash'
        ],
        fabricCare: [
          'Machine wash cold on gentle cycle with like colors',
          'Use mild eco-friendly detergent; do not bleach',
          'Line dry in shade or tumble dry on ultra-low; cool iron if needed'
        ],
        images: [targetRelPath],
        inStock: true,
        sku: `FAM-W-${catGroup.dir.toUpperCase().substring(0, 3)}-${item.id.replace('w-', '').toUpperCase()}`,
        tags: [
          'women',
          catGroup.category.toLowerCase().replace(/\s+/g, '-'),
          ...item.name.toLowerCase().split(' ').filter(w => w.length > 3)
        ]
      };

      verifiedProducts.push(product);
    }
  }

  // Write TypeScript file
  const fileContent = `import { Product } from '../types';\n\nexport const WOMEN_PRODUCTS: Product[] = ${JSON.stringify(verifiedProducts, null, 2)};\n`;
  fs.writeFileSync('src/data/womenProducts.ts', fileContent, 'utf8');
  console.log(`\nSuccessfully wrote ${verifiedProducts.length} verified products to src/data/womenProducts.ts`);

  // Generate montages for each category
  console.log('\nGenerating visual verification montages for all 8 categories...');
  for (const catGroup of CATALOG_DEF) {
    const imgList = verifiedProducts
      .filter(p => p.subcategory === catGroup.category)
      .map(p => `public${p.images[0]}`);

    const montageTarget = `public/montage_${catGroup.dir.replace('-', '_')}.jpg`;
    try {
      execSync(`montage ${imgList.join(' ')} -tile 5x4 -geometry 240x300+4+4 -title "${catGroup.category} 1 to 20" ${montageTarget}`);
      console.log(`  -> Generated ${montageTarget}`);
    } catch (e) {
      console.error(`  -> Error generating montage for ${catGroup.category}:`, e.message);
    }
  }

  console.log('\nCatalog build complete!');
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
