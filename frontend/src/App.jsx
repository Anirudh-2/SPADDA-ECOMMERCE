import { useEffect, useRef, useState } from "react";
import "./App.css";

const FIT_KEY = "spadda-video-fit";

export default function App() {
  const [brand, setBrand] = useState(null);
  const [error, setError] = useState("");
  const [stage, setStage] = useState("video");
  const [slideIndex, setSlideIndex] = useState(0);
  const [muted, setMuted] = useState(false);
  const [fit, setFit] = useState(() => localStorage.getItem(FIT_KEY) || "fit");
  const videoRef = useRef(null);

  useEffect(() => {
    fetch("/api/brand")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Could not load brand");
        }
        return res.json();
      })
      .then(setBrand)
      .catch((err) => setError(err.message));
  }, []);

  useEffect(() => {
    localStorage.setItem(FIT_KEY, fit);
  }, [fit]);

  useEffect(() => {
    if (stage !== "video" || !videoRef.current) {
      return undefined;
    }
    const video = videoRef.current;
    video.muted = false;
    const attempt = video.play();
    if (attempt) {
      attempt.catch(() => {
        video.muted = true;
        setMuted(true);
        video.play().catch(() => {});
      });
    }
    return undefined;
  }, [stage, brand]);

  useEffect(() => {
    if (stage !== "slides" || !brand) {
      return undefined;
    }
    const timer = setTimeout(() => {
      if (slideIndex + 1 < brand.logoUrls.length) {
        setSlideIndex(slideIndex + 1);
      } else {
        setStage("home");
      }
    }, 5000);
    return () => clearTimeout(timer);
  }, [stage, slideIndex, brand]);

  const goToSlides = () => {
    setSlideIndex(0);
    setStage("slides");
  };

  const skipSlide = () => {
    if (!brand) {
      return;
    }
    if (slideIndex + 1 < brand.logoUrls.length) {
      setSlideIndex(slideIndex + 1);
    } else {
      setStage("home");
    }
  };

  if (error) {
    return <div className="error">{error}. Start Postgres and the Spring Boot backend, then refresh.</div>;
  }

  if (!brand) {
    return <div className="loading">Loading SP ADDA...</div>;
  }

  if (stage === "video") {
    return (
      <div className="splash">
        <video
          ref={videoRef}
          className={`video-${fit}`}
          src={brand.welcomeVideoUrl}
          autoPlay
          muted={muted}
          playsInline
          onEnded={goToSlides}
        />
        <div className="splash-actions">
          <label className="fit-control">
            Screen
            <select value={fit} onChange={(e) => setFit(e.target.value)}>
              <option value="fit">Fit</option>
              <option value="fill">Fill</option>
              <option value="stretch">Stretch</option>
            </select>
          </label>
          <button
            type="button"
            onClick={() => {
              setMuted((m) => {
                const next = !m;
                if (videoRef.current) {
                  videoRef.current.muted = next;
                  if (!next) {
                    videoRef.current.play().catch(() => {});
                  }
                }
                return next;
              });
            }}
          >
            {muted ? "Unmute" : "Mute"}
          </button>
          <button type="button" onClick={goToSlides}>
            Skip
          </button>
        </div>
      </div>
    );
  }

  if (stage === "slides") {
    return (
      <div className="splash">
        <img
          className="splash-slide"
          src={brand.logoUrls[slideIndex]}
          alt={`${brand.name} ${slideIndex + 1}`}
        />
        <div className="splash-actions">
          <button type="button" onClick={skipSlide}>
            Skip
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="home">
      <header className="home-header">
        <h1>
          <span>SP</span> ADDA
        </h1>
        <div className="categories">{brand.categories}</div>
      </header>
      <section className="gallery">
        {brand.logoUrls.map((url) => (
          <img key={url} src={url} alt={brand.name} />
        ))}
      </section>
      <section className="contact">
        <a href={`tel:${brand.phone}`}>Call {brand.phone}</a>
        <a href={`mailto:${brand.email}`}>{brand.email}</a>
        <a
          href={`https://instagram.com/${brand.instagram.replace("@", "")}`}
          target="_blank"
          rel="noreferrer"
        >
          Instagram {brand.instagram}
        </a>
        <a href={brand.youtubeUrl} target="_blank" rel="noreferrer">
          YouTube {brand.youtube}
        </a>
        <div className="address">{brand.address}</div>
        <a href={brand.youtubeUrl} target="_blank" rel="noreferrer" className="qr-link">
          <img className="qr" src={brand.qrImageUrl} alt="SP ADDA QR code" />
        </a>
      </section>
    </main>
  );
}
