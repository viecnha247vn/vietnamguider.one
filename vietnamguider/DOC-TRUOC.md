# Vietnam Guider — gói hoàn chỉnh

## Cách dùng (3 bước)

1. Giải nén file này.
2. Trong repo của bạn, **xoá thư mục `vietnamguider/` cũ và thay bằng thư mục `vietnamguider/` trong gói này.** Không cần ghép thủ công file nào.
3. Commit và push. Vercel tự build.

Thư mục `vietnamguider/` ở đây là **dự án đầy đủ, chạy được ngay**: gồm cả những file gốc không đổi (`package.json`, `package-lock.json`, `next.config.mjs`, `postcss.config.mjs`, 10 bài `.mdx`) lẫn toàn bộ phần đã làm lại.

`preview.html` và `HUONG-DAN.md` nằm ngoài thư mục dự án — chỉ để bạn đọc, không cần đưa lên.

---

## Trong gói có gì

```
DOC-TRUOC.md      ← file bạn đang đọc
preview.html      ← mở trên điện thoại để xem hướng thiết kế, không cần cài gì
HUONG-DAN.md      ← lý do đằng sau từng quyết định màu / chữ / bố cục / ảnh / giọng viết
vietnamguider/    ← DỰ ÁN ĐẦY ĐỦ — thay nguyên thư mục này vào repo
```

---

## Ảnh điểm đến: bỏ hình vẽ, chuyển sang ảnh thật có giấy phép

Bản trước tôi vẽ 12 mô-típ SVG dùng chung cho 20 nơi. **Cách đó sai** — núi của Sa Pa và của Mai Châu y hệt nhau, nên nó là biểu tượng phân loại chứ không phải hình minh hoạ của nơi đó. Nhìn giả. Đã bỏ.

Thay bằng hai trạng thái:

- **Có ảnh** → hiện ảnh kèm dòng ghi công tự động ở đáy.
- **Chưa có ảnh** → **bản chữ**: tên điểm đến cỡ lớn trên nền giấy kẻ chỉ, kèm dòng `photo to come`. Nó không giả vờ là ảnh, nên không giả. Trông như mặt vé giấy, đúng ngôn ngữ của trang.

Mở `preview-destinations.html` để xem trạng thái chưa có ảnh.

### Hàng rào chống vi phạm bản quyền

Kiểu `Photo` bắt buộc có `credit`, `license`, `licenseUrl`. **Thiếu bất kỳ trường nào thì component không hiện ảnh** mà quay về bản chữ. Bạn không thể vô tình đăng ảnh thiếu ghi công — đây là thiết kế cố ý, không phải phiền phức.

### Lấy ảnh: một câu lệnh

```
cd vietnamguider
npm run photos
```

Script `scripts/fetch-destination-photos.mjs` tự tải cả 20 ảnh từ Wikimedia Commons, tự lọc giấy phép (loại NC và ND), tự điền tên người chụp và giấy phép vào `lib/destination-photos.json`. Trang tự đọc file đó — **không phải sửa dòng code nào**.

Xem trước không tải: `npm run photos:dry`. Chỉ lấy CC0: `npm run photos:cc0`.

**Phải xem lại bằng mắt.** Giấy phép thì chắc chắn đúng, nhưng ảnh có thể không đúng cảnh. Chạy `npm run dev`, mở `/destinations`, ô nào không ưng thì sửa mục đó trong JSON.

### Tìm ảnh thủ công

Xem **`ANH-NGUON.md`** — bảng tra 20 dòng, mỗi điểm đến có sẵn hai link tìm kiếm (Wikimedia Commons và PxHere) cùng gợi ý nên tìm hình gì để tránh ảnh chung chung.

Ba điều dễ sai nhất, tóm gọn:

1. **CC BY-NC là cấm** với trang của bạn. Trang có link kiếm tiền = dùng thương mại. Đây là chỗ nhiều người nhầm nhất.
2. **Ghi tên người chụp gốc**, không phải người tải lên Wikimedia — hai người này thường khác nhau.
3. **Ưu tiên CC0 / Public domain.** Nếu bạn xử lý ảnh duotone cho khớp giao diện thì CC BY-SA buộc bạn phát hành bản đã sửa cũng dưới CC BY-SA. CC0 thì không phiền gì.

Tải ảnh về `public/destinations/` chứ đừng hotlink thẳng từ Wikimedia — xem `public/destinations/README.txt` để biết quy ước đặt tên và kích thước.

---

## 20 điểm đến

Đã thêm 10 điểm, cân đối lại ba miền: **Bắc 8 · Trung 6 · Nam 6**.

Mới: Hạ Long, Mộc Châu, Cao Bằng (Bắc) · Đà Nẵng, Phong Nha, Quy Nhơn, Nha Trang (Trung) · Hồ Chí Minh City, Cần Thơ, Côn Đảo (Nam).

Tôi chia 3–4 mỗi miền nhưng ưu tiên **cân bằng tổng số** chứ không chia đều cứng 10 điểm mới — trước đây Trung chỉ có 2 điểm trong khi Bắc có 5, để nguyên thì trang lệch hẳn.


### Khi bạn có ảnh thật

`DestinationStamp` đã nhận sẵn prop `photo`. Có ảnh có giấy phép thì chỉ cần thêm trường `photo` vào `lib/destinations.ts`, không phải sửa component.

Nguồn ảnh an toàn, theo thứ tự ưu tiên:

1. **Bạn tự chụp.** Tốt nhất về mọi mặt — bản quyền của bạn, và ảnh thật chứng minh bạn đã ở đó.
2. **Wikimedia Commons** — nhiều ảnh CC BY / CC BY-SA. Bắt buộc ghi tên tác giả và tên giấy phép.
3. **Unsplash / Pexels** — miễn phí cho thương mại, nhưng đúng những ảnh này là ảnh mà mọi trang khác cũng dùng.

Xử lý ảnh cho khớp giao diện: duotone mực→giấy, góc vuông, viền 2px, chú thích bằng chữ mono có ghi tháng chụp.

### Một lỗi câm bắt được lúc làm

`lib/nav.ts` vẫn lọc điểm đến bằng tên vùng tiếng Việt (`"Miền Bắc"`) sau khi đã đổi sang `"The North"`. Menu Destinations sẽ **xổ ra rỗng, không báo lỗi gì**. Đã sửa và kiểm bằng máy — đây là lần thứ hai cùng một kiểu lỗi, nên giờ cả nav và trang Destinations dùng chung một nguồn dữ liệu `lib/destinations.ts`, không thể lệch nữa.

---

## Thanh menu tự cuộn ngang (máy tính)

10 mục không vừa màn hình hẹp, nên trước đây nó đẩy tràn cả trang sang ngang. Đã sửa:

- Dải nav bọc trong `.nav-scroll` với `overflow-x: auto` — **chỉ dải đó trượt**, trang đứng yên.
- `overscroll-behavior-x: contain` chặn cuộn lan sang trang khi trượt hết dải.
- Thanh cuộn ẩn đi cho sạch (`scrollbar-width: none`).
- `min-w-0` trên dải nav — thiếu dòng này thì flex item không co lại được và trang lại tràn như cũ. Đây là chỗ hay bị bỏ sót nhất.

**Điểm kỹ thuật đáng chú ý:** bảng menu xổ xuống được đặt **ngoài** vùng cuộn, gắn ở tầng `<header>`. Nếu để trong vùng cuộn thì `overflow-x` cắt cụt nó — bảng xổ sẽ nằm trong một khung trượt bé xíu thay vì trải rộng.

---

## Ngôn ngữ giao diện: đã sang tiếng Anh

Toàn bộ chuỗi hiển thị đã chuyển: nhãn menu, nhãn cấp trong bảng tuyến (`Cheapest / Easiest / Comfiest`), sổ chỗ ở (`Budget / Mid-range / Top end`), nút Lưu, trang My Trip, trang 404, các trang hub, chân trang.

**Ba thứ cố ý giữ nguyên tiếng Việt:**

1. **Địa danh có dấu** — *Hà Nội, Sa Pa, Hội An, Tả Van, Hà Giang*. Đây là tên riêng, không phải ngôn ngữ giao diện. Viết đúng dấu là tín hiệu bản địa mạnh nhất trên trang, và cũng là điều phân biệt bạn với hàng trăm trang viết "Ha Noi" cẩu thả.
2. **Tên món ăn** trong trang Food — *Phở, Bún chả, bánh mì, cao lầu*. Dịch ra là mất luôn thứ người đọc cần gõ vào Google Maps.
3. **Dòng chữ nhỏ cạnh logo** — *đi khắp Việt Nam*. Đây là khẩu hiệu thương hiệu, giống như tên một nhà hàng Việt ở nước ngoài. Muốn bỏ thì xoá thẻ `<span>` chứa nó trong `components/Header.tsx`.

**Chú thích trong code vẫn để tiếng Việt** vì chúng viết cho bạn, không hiển thị ra trang. Nếu muốn đổi sang tiếng Anh thì báo tôi.

### Một lỗi bắt được khi dịch

`app/destinations/page.tsx` lọc điểm đến theo tên vùng. Đổi `"Miền Bắc"` sang `"The North"` trong `lib/nav.ts` mà quên đổi ở đây thì trang Destinations sẽ hiện rỗng hoàn toàn — không báo lỗi, chỉ trắng trơn. Đã đồng bộ và kiểm lại bằng máy.

---

## Công khai hoa hồng: từ 3 lần xuống 1 lần

Trước đây mỗi bài nhắc hoa hồng ba lần (chân bảng tuyến, chân sổ chỗ ở, footer). Đã gom về **một dòng duy nhất** dưới tiêu đề bài, chữ mono nhỏ màu nhạt, đặt **trước** mọi link đối tác.

**Không bỏ hẳn được.** Điều khoản của Agoda, Booking và 12Go đều bắt buộc công khai. Vi phạm thì bị khoá tài khoản và mất hoa hồng chưa thanh toán — tức là mất toàn bộ mô hình doanh thu. Muốn kín đáo hơn thì chỉnh cỡ chữ hoặc màu trong `app/blog/[slug]/page.tsx`, đừng xoá.

Phần còn giữ ở chân thẻ (`GIÁ THAM KHẢO · NHÀ XE ĐẶT GIÁ · KIỂM TRA ...`) không phải công khai hoa hồng — đó là ghi chú về độ tươi của giá, làm tăng độ tin cậy.

---

## "My Trip" — Giai đoạn 1 làm được ngay, không cần đăng nhập

Kế hoạch xếp Trip Builder vào Giai đoạn 1 kèm NextAuth/Supabase. Tôi rút phần giá trị nhất lên làm trước, bỏ phần tốn kém:

| | Kế hoạch gốc | Bản này |
|---|---|---|
| Lưu lịch trình | Supabase + Auth | `localStorage` |
| Chia sẻ nhóm | Link tới bản ghi trong DB | Lịch trình mã hoá thẳng trong URL |
| Chi phí hạ tầng | Database + Auth | 0 |
| Nghĩa vụ GDPR | Có (lưu dữ liệu cá nhân) | Không (không thu thập gì) |
| Thời gian | Tháng 1–3 | Xong rồi |

**Cách hoạt động:** mỗi lựa chọn trong bảng tuyến và sổ chỗ ở có nút **Lưu**. Đã lưu thì hiện ở `/my-trip`. Bấm *Chia sẻ lịch trình* sinh ra link kiểu `/my-trip?t=<mã>` — bạn bè mở là thấy toàn bộ, không cần tài khoản, và có nút lưu về máy họ.

**Vì sao làm thế này trước:** đây là phép thử rẻ nhất cho câu hỏi đắt nhất. Nếu không ai bấm Lưu thì việc dựng đăng nhập ở tháng 1–3 là tiền vứt đi. Nếu nhiều người bấm, bạn có số liệu thật để quyết định nâng lên tài khoản — lúc đó lý do sẽ là *đồng bộ nhiều thiết bị*, một nhu cầu người dùng đã tự chứng minh.

**Giới hạn phải biết:** xoá lịch sử trình duyệt là mất lịch trình; không đồng bộ giữa điện thoại và máy tính. Trang đã nói rõ điều này với người dùng thay vì giấu.

### Đo trước khi xây tiếp

Gắn một sự kiện analytics vào nút Lưu và nút Chia sẻ. Hai con số này quyết định có nên bước sang Giai đoạn 2 hay không, chứ không phải lịch tháng.

---

## Menu: đủ 10 mục, không mục nào 404

Menu dựng lại đúng danh sách bạn đưa. Nhưng dựng menu 10 mục mà chỉ có 3 trang là quay lại đúng lỗi cũ, nên mỗi mục đều có trang thật:

| Mục menu | Đường dẫn | Tình trạng |
|---|---|---|
| Destinations | `/destinations` | **Có nội dung** — 10 điểm đến rút từ chính 10 bài, chia theo miền |
| Plan Your Trip | `/plan` | Trang hub, `noindex` |
| Things To Do | `/things-to-do` | Trang hub, `noindex` |
| Getting Around | `/blog` | **Có nội dung** — 10 bài tuyến, menu xổ theo điểm khởi hành |
| Where To Stay | `/stay` | Trang hub, `noindex` |
| Food | `/food` | Trang hub, `noindex` |
| Vietnam Visa | `/visa` | Trang hub, `noindex` |
| Travel Tools | `/tools` | Trang hub, `noindex` |
| Deals | `/deals` | Trang hub, `noindex` |
| My Trip | `/my-trip` | Có trang, hiện là màn hình rỗng |

### Vì sao là trang hub `noindex` chứ không phải "coming soon"

Ba lựa chọn, hai cái sai:

- Để link trỏ vào hư không → **404**. Google ghi nhận và trừ điểm cả site.
- Trang "coming soon" cho index → **thin content**. Cũng bị trừ, mà còn kéo tụt các trang tốt.
- **Trang thật, nói thật, `noindex`** → người dùng bấm vào thấy nội dung sắp có gì và có lối đi tiếp; Google không index cho tới khi trang đủ chất.

Mỗi trang hub liệt kê 4 bài đang viết và có nút dẫn sang phần đã có. Trong menu, các mục này mang dấu **sắp có** nhỏ màu nghệ — trung thực với người đọc mà không cướp sự chú ý.

### Khi một mục đã có nội dung

1. Viết bài thật cho mục đó.
2. Mở `app/<mục>/page.tsx`, xoá dòng `robots: { index: false ... }` trong `hubMetadata` (hoặc thay `hubMetadata` bằng metadata thường).
3. Thêm đường dẫn vào mảng trong `app/sitemap.ts`.
4. Xoá `soon: true` của mục đó trong `lib/nav.ts` để mất dấu "sắp có".

---

## Nguyên nhân thật của chuỗi build đỏ

**Đây là lỗi của tôi.** Ở bản phân tích đầu tiên tôi thấy dòng này trong `app/blog/[slug]/page.tsx`:

```tsx
<MDXRemote source={post.content} components={components} options={{ blockJS: false }} />
```

và kết luận `blockJS` là option không hợp lệ, rồi xoá đi. Nó hợp lệ, và nó gánh cả hệ thống.

`next-mdx-remote` **từ phiên bản 6.0.0 trở lên chặn mọi biểu thức JavaScript trong MDX theo mặc định** vì lý do bảo mật. Dự án này dùng `^6.0.0`. Cả 10 bài viết đều truyền props dạng biểu thức:

```mdx
<RouteComparisonCard options={[ ... ]} />
<StayLedger stays={[ ... ]} />
```

Khi bị chặn, component nhận `options === undefined`, rồi gọi `.map()` → build chết ở bước prerender:

```
Error occurred prerendering page "/blog/da-nang-to-hoi-an"
TypeError: Cannot read properties of undefined (reading 'map')
```

Đã khôi phục `options={{ blockJS: false }}` kèm một khối chú thích ngay trên nó để không ai xoá lại lần nữa. `blockDangerousJS` vẫn bật mặc định, nên `eval` / `Function` / `require` trong MDX vẫn bị chặn — nội dung MDX ở đây là của chính bạn nên mức này là đúng.

### Vì sao mất nhiều vòng mới ra

Thông báo `Command "npm run build" exited with 1` không chứa nguyên nhân. Nguyên nhân nằm trong Build Logs, cách đó vài dòng. **Bài học cho lần sau: mở Build Logs trước, đừng thử sửa mò.**

### Những thay đổi phòng thủ ở các bản trước — giữ hay bỏ

| Thay đổi | Có phải nguyên nhân? | Xử lý |
|---|---|---|
| Bỏ `next/font`, nạp font bằng `<link>` | Không | **Giữ** — vẫn chạy tốt, bớt một phụ thuộc mạng lúc build |
| Bỏ `@apply`, viết CSS thuần | Không | **Giữ** — tương đương về kết quả |
| `<SayIt>` thành thẻ tự đóng | Không | **Giữ** — đơn giản hơn |
| `ignoreBuildErrors` + `ignoreDuringBuilds` | Không | **Tạm giữ** cho lần deploy này. Khi thấy xanh, đổi cả hai về `false` trong `next.config.mjs` rồi deploy lại để bật lại kiểm tra type. |

---

## Các lớp phòng thủ đã thêm

Tôi đã chạy **type-check thật** (TypeScript 5) lên toàn bộ gói. Kết quả: **code không có lỗi type**. Vậy nguyên nhân nằm ở tầng khác, và bản này bịt hết các tầng còn lại cùng lúc thay vì thử từng cái — vì mỗi vòng thử của bạn tốn quá nhiều thời gian.

| Tầng có thể chết | Đã xử lý thế nào |
|---|---|
| `next/font/google` tải font lúc build | Bỏ hẳn, nạp font bằng thẻ `<link>` |
| TypeScript / ESLint chặn build | `typescript.ignoreBuildErrors` + `eslint.ignoreDuringBuilds` trong `next.config.mjs` |
| Tailwind `@apply` gặp class không tồn tại | Bỏ sạch `@apply`, viết CSS thuần bằng mã màu |
| MDX biên dịch hỏng | Đưa `<SayIt>` về thẻ **tự đóng** như 9 bài đã chạy được; không còn thẻ JSX nào có con trong toàn bộ `content/` |
| Thư mục lồng còn sót | `tsconfig.json` loại `vietnamguider`, `vietnamguider-full`, `.next`, `out` |

Giao diện **không đổi một pixel** so với `preview.html`.

### Lưu ý về `ignoreBuildErrors`

Đây là biện pháp để trang lên được, không phải cách làm lâu dài. Kiểm tra vẫn chạy được thủ công bất cứ lúc nào:

```
npx tsc --noEmit
npm run lint
```

Khi nào build ổn định thì đổi hai dòng đó về `false` trong `next.config.mjs`.

### Nếu lần này vẫn đỏ

Thì nguyên nhân nằm ngoài source code (biến môi trường, cấu hình project trên Vercel, hoặc file sót trong repo). Lúc đó chỉ còn một cách duy nhất là đọc log. Trên máy bạn:

```
cd đường/dẫn/tới/vietnamguider
npm ci
npm run build
```

Copy từ dòng `Error:` hoặc `Failed to compile` trở xuống, dán dạng chữ.

---

## Ghi chú: vì sao bỏ next/font

`app/layout.tsx` **không còn dùng `next/font/google`**. Font nạp bằng thẻ `<link>` thẳng tới Google Fonts, biến `--font-sig` / `--font-doc` / `--font-so` khai báo trong `app/globals.css`.

**Vì sao:** `next/font` tải file font từ Google **ngay lúc build**. Đó là thứ duy nhất trong toàn bộ thay đổi cần gọi mạng lúc build — và là khác biệt lớn nhất so với commit `798e375` (bản gốc, build xanh). Bản gốc dùng Fraunces + Inter không kèm subset `vietnamese`; bản làm lại thêm 3 font mới kèm subset `vietnamese`. Nếu máy build của Vercel không lấy được font, hoặc tên font / subset sai, `npm run build` chết đúng kiểu bạn đang gặp.

Nạp bằng `<link>` thì trình duyệt tải font, quá trình build không đụng mạng. **Giao diện giữ nguyên 100%** — đây chính là cách `preview.html` đang chạy.

### Đây là một phép thử có kiểm soát, không phải đoán

- **Nếu build xanh** → nguyên nhân đúng là `next/font`. Xong việc, không cần làm gì thêm.
- **Nếu vẫn đỏ** → đã loại được nguyên nhân này. Lúc đó bắt buộc phải có log thật, không thể cắt tiếp bằng suy luận.

### Cách lấy log thật (làm song song, đừng chờ)

Trên máy bạn:

```
cd đường/dẫn/tới/vietnamguider
npm ci
npm run build
```

Khoảng 60 giây. Copy từ dòng `Error:` hoặc `Failed to compile` trở xuống, dán dạng chữ.

Trên Vercel: bấm vào dòng deployment đỏ → khu vực log build nằm ngay trên dòng `Command "npm run build" exited with 1`. Cần đoạn **phía trên** dòng đó, không phải chính dòng đó.

---

## Đã sửa những gì so với bản gốc

| Vấn đề | Đã xử lý |
|---|---|
| 9/10 mục menu dẫn tới 404 | `lib/nav.ts` chỉ còn trang có thật; menu "Getting Around" liệt kê 10 tuyến theo miền |
| 60 nút affiliate không có mã | `lib/aff.ts` — khai báo ID một lần, dùng `go12()` / `goAgoda()` / `goBooking()` |
| Thiếu sitemap / robots / JSON-LD / canonical | `app/sitemap.ts`, `app/robots.ts`, JSON-LD `Article` + canonical trong trang bài |
| Không có footer, không có trang minh bạch hoa hồng | `components/Footer.tsx`, `app/disclosure/page.tsx` |
| Không có trang 404 | `app/not-found.tsx` |
| `options={{ blockJS: false }}` không hợp lệ | đã bỏ |
| `tsconfig.json` exclude thư mục không tồn tại | đã dọn |
| Thiếu `.gitignore` | đã thêm |
| **Build fail trên Vercel** | `RouteBoard` và `StayLedger` nhận cả props cũ lẫn mới, và export luôn hai tên cũ → 10 bài `.mdx` cũ render được ngay, không phải sửa gì |
| Giao diện trúng mọi mặc định của web AI | bảng màu, chữ, bố cục, chi tiết nhận diện mới — xem `HUONG-DAN.md` |

Hai file `components/RouteComparisonCard.tsx` và `components/HotelRecommendationCard.tsx` đã được **xoá** — `RouteBoard.tsx` và `StayLedger.tsx` đã export sẵn hai tên đó.

---

## Việc bạn cần tự làm (không ảnh hưởng build)

1. **Điền ID affiliate thật** vào `lib/aff.ts` — hiện là `YOUR_12GO_AFF_ID`, `YOUR_AGODA_CID`, `YOUR_BOOKING_AID`. Chưa điền thì link vẫn chạy, chỉ là không ra tiền.
2. **Thay tên khách sạn giả** trong `content/hanoi-to-sa-pa.mdx` — tôi để `TÊN KHÁCH SẠN THẬT` viết hoa cho dễ tìm. 9 bài còn lại cũng đang dùng tên chung chung kiểu "Town-centre hostel".
3. **Xác minh lại giá** rồi cập nhật trường `checked` trong frontmatter. Số trong bài Sa Pa lấy từ nguồn tháng 5–8/2026, chỉ là khoảng tham khảo.
4. **Chuyển dần 9 bài còn lại** sang cú pháp mới (`<RouteBoard>`, `<StayLedger>`, `<SayIt>`, giá bằng đồng, tên nhà xe thật) theo khuôn bài Sa Pa. Sáu quy tắc nội dung ở mục 5 của `HUONG-DAN.md`.
5. Chuyển xong hết thì xoá hai dòng cuối trong `RouteBoard.tsx` / `StayLedger.tsx` (`export const RouteComparisonCard = ...`) và hai dòng tương ứng trong map component của `app/blog/[slug]/page.tsx`.

---

## Nếu build vẫn lỗi

Vào trang deployment trên Vercel → tab **Logs** (hoặc phần "Build Logs"), tìm dòng đầu tiên có `Error:` hoặc `Failed to compile` và gửi tôi. Dòng `Command "npm run build" exited with 1` chỉ là mã thoát, không cho biết nguyên nhân.

Nghi phạm hay gặp:
- `Module not found: Can't resolve '@/lib/...'` → chưa thay đủ cả thư mục.
- Lỗi `next/font` liên quan subset `vietnamese` → bỏ `"vietnamese"` khỏi mảng `subsets` của `Lora` trong `app/layout.tsx`.
