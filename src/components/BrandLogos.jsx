import { brands } from '../data/brands'

export default function BrandLogos() {
  return (
    <section className="brand-section" aria-labelledby="brand-section-heading">
      <div className="page-shell">
        <h2 id="brand-section-heading">Brands &amp; organisations</h2>
        <ul className="brand-grid">
          {brands.map((brand) => (
            <li className="brand-logo" key={brand.name}>
              <div className="brand-logo__media">
                <img
                  className={brand.blendOnLight ? 'brand-logo__image--blend' : undefined}
                  src={brand.logo}
                  alt=""
                  width={brand.width}
                  height={brand.height}
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <span className="brand-logo__name">{brand.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
