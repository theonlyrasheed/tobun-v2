export function AboutIntro() {
  return (
    <>
      <section className="bio-hero wrap" id="bio-intro" data-screen-label="Biography — Intro">
        <div className="bio-lead-grid" style={{ marginTop: "clamp(12px, 1.4vw, 18px)", textAlign: "left" }}>
          <div className="bio-lead-text">
            <span className="kicker">Artist biography</span>
            <p className="lead" style={{ maxWidth: "48ch" }}>
              My name is Lateefat Modupeola Tobun — a multidisciplinary visual artist and digital
              couturier whose practice explores the evolving boundary between physical creativity and the
              global digital world.
            </p>
          </div>
          <div className="ph portrait" data-cursor="view" data-cursor-label="Lateefat" data-reveal>
            <img
              src="/assets/img/portrait.png"
              alt="Portrait — Lateefat Tobun"
              style={{ objectPosition: "50% 18%" }}
            />
          </div>
        </div>
      </section>

      <section className="section wrap">
        <div className="eyebrow-row">
          <div>
            <span className="kicker">The full story</span>
            <h2 className="h-lg" style={{ marginTop: "16px" }}>
              What I'm made of
            </h2>
          </div>
        </div>
        <div className="body-cols" data-reveal>
          <p>
            My work exists at the intersection of art, fashion, technology and human experience — where
            tradition meets innovation, and imagination becomes a tool for transformation.
          </p>
          <p>
            Academically, I hold a BSc in Economics and two MSc degrees in Economics and Applied
            Artificial Intelligence &amp; Data Analytics from Balfour University, United Kingdom. Yet my
            heart chose art.
          </p>
          <p>
            My relationship with creativity began through colour, brush strokes on canvas, patterns on
            fabric and expressive contrasts in charcoal. I worked extensively with ADIRE, the traditional
            Yoruba tie-and-dye textile, using fabric as both medium and message — learning how patterns
            could tell stories, preserve culture and communicate identity beyond words.
          </p>
          <p>
            My artistic journey took a defining turn in 2017, when I experimented with tie-and-dye on a
            single clothing piece. With only four yards of fabric and a growing curiosity about how
            patterns interact with the human body, I began to imagine form beyond flat material.
          </p>
          <p>
            As I explored technology, I recognised its potential to redefine fashion sustainably. This
            led me to study Artificial Intelligence — not as a replacement for creativity, but as a
            collaborator capable of launching wearable art digitally while minimising waste and
            reimagining runway systems in a global digital economy.
          </p>
          <p>
            Today, my practice spans murals, traditional painting, AI-generated art, digital
            illustration, sketches and digital couture. My most recent work centres on mindful regulation
            — using art as a therapeutic tool to help people regulate emotions, find calm and experience
            creativity as a form of healing. This is what I am made of: art as purpose, art as
            innovation, art as healing.
          </p>
        </div>
      </section>
    </>
  );
}
