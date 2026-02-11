const HeaderHero = () => {
  return (
    <>
      <div
        id="home"
        className="hero"
        style={{
          backgroundImage: "url('/images/home-hero.JPG')",
        }}
      >
        <div className="hero-content">
          <img src="/images/large-pink-logo-tagline.png" alt="Grace and Grit | Spin Studio | Rock Hill SC" className="hero-logo" />
          <span className="d-flex justify-content-center">
            <hr className="w-25" />
          </span>
          <div className="lead mt-4">
            <strong style={{ fontSize: "32px" }}>Rock Hill&apos;s Premier Spin Studio</strong>
            <br />
            <div className="mt-4">
              <VagaroWidget
                widgetUrl={
                  "https://www.vagaro.com//resources/WidgetPopupLoader/OZqqCJSqDJOcT3qnV39y6RuRFXoSlXYO61Ctdg4tjxMG9pUxapkUcvCu7gevEhAJDXwQ4pcUbfY?v=Y4D5pQyz0w5rCsFtdatTwtFScJy5ZP5ENIbgSbzvNBaW#"
                }
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeaderHero;
