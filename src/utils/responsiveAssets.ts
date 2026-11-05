const optimizedWidths: Record<string, number> = {
  'hero_family_clear.jpg': 1376,
  'hero_family_spring.jpg': 1376,
  'women_banner_crisp.jpg': 1200,
  'men_banner_crisp.jpg': 1200,
  'kids_baby_crisp.jpg': 1200,
  'teens_banner_crisp.jpg': 1200,
  'sale_banner_crisp.jpg': 1200,
  'about_family_crisp.jpg': 1200,
};

export const getResponsiveAsset = (src: string) => {
  const filename = src.slice(src.lastIndexOf('/') + 1);
  const largestWidth = optimizedWidths[filename];
  if (!largestWidth) return { src };

  const optimizedPath = (width: number) => `/assets/optimized/${filename.replace(/\.jpg$/i, `-${width}.jpg`)}`;
  return {
    src: optimizedPath(720),
    srcSet: `${optimizedPath(720)} 720w, ${optimizedPath(largestWidth)} ${largestWidth}w`,
  };
};
