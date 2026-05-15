"use client";

import { useRef, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";

export default function Home() {
  const [link, setLink] = useState("");
  const [qrValue, setQrValue] = useState("");
  const [error, setError] = useState("");
  const qrRef = useRef<HTMLDivElement>(null);

  const normalizeUrl = (value: string) => {
    const trimmed = value.trim();

    if (!trimmed) return "";

    if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
      return trimmed;
    }

    return `https://${trimmed}`;
  };

  const handleGenerate = () => {
    const url = normalizeUrl(link);

    try {
      new URL(url);
      setQrValue(url);
      setError("");
    } catch {
      setError("Введите корректную ссылку");
      setQrValue("");
    }
  };

  const handleDownload = () => {
    const canvas = qrRef.current?.querySelector("canvas");

    if (!canvas) return;

    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");

    link.href = image;
    link.download = "qr-code.png";
    link.click();
  };

  return (
    <main className="min-h-screen bg-[#0b0f19] px-6 py-10 text-white">
      <section className="mx-auto flex min-h-[80vh] max-w-5xl items-center justify-center">
        <div className="w-full rounded-[32px] border border-white/10 bg-white/[0.04] p-6 shadow-2xl backdrop-blur-md sm:p-10">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="mb-4 inline-flex rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-200">
                QR Code Generator
              </p>

              <h1 className="text-4xl font-bold leading-tight sm:text-5xl">
                Создай QR-код для любой ссылки
              </h1>

              <p className="mt-5 max-w-xl text-base leading-7 text-white/60">
                Вставь ссылку на сайт, портфолио, Telegram, GitHub или проект.
                Сервис моментально создаст QR-код, который можно скачать как PNG.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <input
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  placeholder="https://example.com"
                  className="min-h-[56px] flex-1 rounded-2xl border border-white/10 bg-white/[0.06] px-5 text-white outline-none transition placeholder:text-white/35 focus:border-cyan-400/60"
                />

                <button
                  onClick={handleGenerate}
                  className="min-h-[56px] rounded-2xl bg-cyan-400 px-7 font-semibold text-black transition hover:scale-[1.02] hover:bg-cyan-300"
                >
                  Generate
                </button>
              </div>

              {error && <p className="mt-3 text-sm text-red-400">{error}</p>}

              {qrValue && (
                <button
                  onClick={handleDownload}
                  className="mt-5 rounded-2xl border border-white/10 px-6 py-3 text-sm font-medium text-white/80 transition hover:border-cyan-400/50 hover:text-white"
                >
                  Download PNG
                </button>
              )}
            </div>

            <div className="flex justify-center">
              <div className="rounded-[28px] border border-white/10 bg-white p-6 shadow-xl">
                <div ref={qrRef}>
                  {qrValue ? (
                    <QRCodeCanvas
                      value={qrValue}
                      size={260}
                      bgColor="#ffffff"
                      fgColor="#111827"
                      level="H"
                      includeMargin
                    />
                  ) : (
                    <div className="flex h-[260px] w-[260px] items-center justify-center rounded-2xl bg-gray-100 text-center text-sm text-gray-400">
                      QR code появится здесь
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}