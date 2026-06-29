# Performance Optimization

The website uses modern techniques to achieve high lighthouse scores.

## Optimization Techniques

- **Next.js Image Component:**
  All gallery and testimonial images use `<Image>` from `next/image` to enable automatic WebP conversion, responsive sizing, and lazy loading.
  
- **CSS Transitions:**
  Input underlines and interactive buttons use hardware-accelerated CSS properties (`transform`, `opacity`, `box-shadow`) to prevent layout shifts.
  
- **Static Site Generation (SSG):**
  Pages are pre-rendered at build time, ensuring fast initial page loads.
  
- **Lenis Smooth Scroll:**
  Lightweight smooth-scrolling engine that prevents scroll-lag.
