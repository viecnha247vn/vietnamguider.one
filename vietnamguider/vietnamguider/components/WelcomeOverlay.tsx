"use client";

import { useEffect, useState } from "react";

const KEY = "vg.welcomed";
const HOLD = 2600; // giữ trên màn hình
const FADE = 500;  // thời gian tan

/**
 * Màn chào 3 giây.
 *
 * BỐN ĐIỀU KHIẾN NÓ KHÔNG HẠI SEO — đừng bỏ điều nào:
 *
 * 1. Trang chủ VẪN dựng và vẽ bình thường bên dưới. Đây chỉ là một lớp phủ,
 *    không phải một route riêng. Google thấy toàn bộ nội dung, và LCP tính
 *    trên hero chứ không phải màn chào. Nếu đổi thành trang riêng rồi
 *    chuyển hướng, bạn mất cả hai thứ đó.
 * 2. Chỉ hiện MỘT LẦN mỗi phiên. Khách quay lại đọc bài thứ hai không
 *    bị chặn nữa — đó là lúc họ khó chịu nhất.
 * 3. Bấm, chạm, cuộn hay gõ phím là tan ngay. Không bao giờ giam người dùng.
 * 4. Ai bật giảm chuyển động thì không thấy gì cả.
 *
 * Không khoá cuộn trang. Người vào từ Google với một câu hỏi cụ thể phải
 * luôn tới được câu trả lời trong một cử chỉ.
 */
export default function WelcomeOverlay() {
  const [state, setState] = useState<"hidden" | "in" | "out">("hidden");

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    try {
      if (sessionStorage.getItem(KEY)) return;
      sessionStorage.setItem(KEY, "1");
    } catch {
      return; // chế độ riêng tư — thà bỏ qua còn hơn hiện lại mỗi lần tải
    }

    setState("in");
    const hold = window.setTimeout(() => setState("out"), HOLD);
    const done = window.setTimeout(() => setState("hidden"), HOLD + FADE);

    const skip = () => {
      window.clearTimeout(hold);
      setState("out");
      window.setTimeout(() => setState("hidden"), FADE);
    };
    const opts = { passive: true, once: true } as AddEventListenerOptions;
    window.addEventListener("pointerdown", skip, opts);
    window.addEventListener("wheel", skip, opts);
    window.addEventListener("keydown", skip, opts);
    window.addEventListener("touchstart", skip, opts);

    return () => {
      window.clearTimeout(hold);
      window.clearTimeout(done);
      window.removeEventListener("pointerdown", skip);
      window.removeEventListener("wheel", skip);
      window.removeEventListener("keydown", skip);
      window.removeEventListener("touchstart", skip);
    };
  }, []);

  if (state === "hidden") return null;

  return (
    <div
      // aria-hidden: trình đọc màn hình đi thẳng vào nội dung, không bị giữ lại.
      aria-hidden
      onClick={() => setState("out")}
      className={`van-coi fixed inset-0 z-[100] flex flex-col items-center justify-center bg-men px-6 text-center text-giay transition-opacity duration-500 ${
        state === "out" ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      <div className="relative z-[1] flex flex-col items-center">
        {/* con dấu đóng xuống */}
        <span className="vg-seal block h-3.5 w-3.5 bg-son shadow-khacnho" />

        {/* Lời chào bằng tiếng Việt — thứ đầu tiên khách học được ở đây. */}
        <p className="vg-a1 mt-7 font-doc text-[46px] font-semibold leading-none sm:text-[64px]">
          Xin chào
        </p>
        <p className="vg-a2 mt-3 font-so text-[11px] uppercase tracking-[.24em] text-nghe">
          sin chow · hello
        </p>

        <p className="vg-a3 mt-7 max-w-[26ch] font-doc text-[19px] leading-relaxed text-giay/85 sm:text-[22px]">
          Welcome to Vietnam. Let&rsquo;s get you moving.
        </p>

        {/* vạch thời gian: cho biết còn bao lâu, và rằng bấm được để bỏ qua */}
        <span
          className="vg-bar mt-9 block h-[3px] w-[132px] origin-left bg-nghe"
          style={{ ["--vg-hold" as string]: `${HOLD}ms` }}
        />
        <p className="vg-a3 mt-4 font-so text-[9.5px] uppercase tracking-[.18em] text-giay/45">
          tap to skip
        </p>
      </div>

    </div>
  );
}
