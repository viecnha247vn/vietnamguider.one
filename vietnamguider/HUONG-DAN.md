# Vietnam Guider — hướng "Bảng tuyến"

## 1. Vì sao bản cũ trông giống web AI

Không phải vì nó xấu. Vì nó *đúng chuẩn mặc định*. Bản cũ trúng gần như trọn bộ dấu hiệu:

- Nền kem `#FAF6EE` + serif tương phản cao + accent vàng đồng. Đây là công thức số một mà mọi mô hình AI cho ra khi nghe hai chữ "du lịch cao cấp".
- `rounded-full` ở mọi nút, `rounded-2xl` ở mọi thẻ, `shadow-mega` đổ bóng mềm.
- Ba cái thẻ bằng nhau, xếp `grid sm:grid-cols-3`, mỗi thẻ một icon `lucide`.
- Font Inter cho thân chữ.
- Mọi khối cách nhau đúng một khoảng như nhau, mọi thứ căn trái, không có gì lệch.

Sửa màu thôi không đủ. Phải đổi **nguồn gốc** của các quyết định.

## 2. Nguồn gốc mới: thế giới vật chất của việc đi lại ở Việt Nam

Tôi cố tình **không** lấy tranh Đông Hồ, nón lá, rồng phượng hay hoa sen. Đó là "Việt Nam" trong mắt người làm poster du lịch, và nó cũng là cliché không kém.

Nguồn thật, và liên quan trực tiếp đến đúng việc trang này làm:

> Tấm biển tuyến sơn tay gắn trước đầu xe khách. Biển men ở bến xe. Vé giấy dập số. Toa tàu sơn men. Chữ số kẻ khuôn bằng bột nghệ trên nền sơn.

Đây là thứ mà **mọi khách nước ngoài đã đi xe khách ở Việt Nam đều nhìn thấy**, và không một AI nào tự nghĩ ra.

### Bảng màu

| Token | Hex | Lấy từ | Dùng cho |
|---|---|---|---|
| `men` | `#0B4F45` | men sơn bến xe, toa tàu cũ | mảng nền chính, header, hero |
| `men-sau` | `#06322C` | | đầu bảng tuyến, footer |
| `son` | `#8A2B20` | sơn mài | con dấu, nhãn cấp, cảnh báo — **rất ít** |
| `nghe` | `#E3A21A` | bột nghệ, chữ số kẻ khuôn | kẻ chỉ, số liệu, nút chính |
| `giay` | `#F2EDE1` | giấy dó | nền vùng đọc |
| `muc` | `#16130F` | mực tre | chữ, viền 2px |

Điểm mấu chốt: **màu chủ đạo là men xanh đặc, không phải nền kem.** Ấn tượng đầu tiên khi mở trang là một mảng màu bão hoà, không phải một tờ giấy. Đây là thứ tách bản này khỏi bản cũ nhiều nhất.

### Chữ

Ba vai, ba việc — không phải ba font cho đẹp:

- **Be Vietnam Pro** (biển hiệu). Do foundry Việt thiết kế, dấu tiếng Việt đặt đúng chỗ chứ không phải Inter ghép dấu tạm. Dùng ở 800, viết hoa, giãn chữ âm.
- **Lora** (đọc). Serif ấm, có subset `vietnamese` đầy đủ.
- **IBM Plex Mono** (số liệu). Giá, giờ, km, biển số. Luôn `tabular-nums`.

### Rủi ro thẩm mỹ tôi cố ý nhận

**Lệch bản in.** Con dấu vuông màu sơn mài có một bóng nghệ lệch 2px, nút có bóng mực đặc lệch 3px, và khi hover nút *trượt vào* bóng đó. Đây là mô phỏng hiện tượng các lớp màu không khít nhau trong tranh in khắc gỗ. Nó rẻ, nó lạ, và nó là thứ khiến người ta nhớ trang.

Đổi lại: **bỏ hết bo góc và bóng mờ.** Toàn trang chỉ có góc vuông, viền 2px, và một loại bóng đặc.

## 3. Chi tiết nhận diện: BẢNG TUYẾN

Thay cho ba cái thẻ trôi nổi. Một khối viền 2px, đầu bảng là mảng men đặc với `HÀ NỘI → SA PA` in hoa đậm, bên phải là `320 KM · 5–6 GIỜ · CT05 / KIỂM TRA 08 · 2026` bằng chữ số mono.

Ba lựa chọn nằm trong cùng một khung, chia bằng nét đứt — **là các dòng trong một cuốn sổ, không phải ba sản phẩm cạnh tranh**. Cấu trúc này nói đúng sự thật: đây là một tuyến đường, có ba cách đi.

Nhãn cấp viết bằng tiếng Việt: `RẺ NHẤT / DỄ NHẤT / ÊM NHẤT`. Khách nước ngoài đọc vẫn hiểu nhờ ngữ cảnh, và ba chữ đó làm cả trang có mùi bản địa mà không cản trở gì.

## 4. Hình ảnh — cách làm mà không cần kho ảnh

Bạn hỏi cả về hình ảnh. Đây là phần dễ phá hỏng mọi thứ nhất.

### Tuyệt đối tránh

- Ảnh flycam ruộng bậc thang lúc hoàng hôn. Nón lá ngược sáng. Thuyền Tam Cốc chụp từ trên cao. Đèn lồng Hội An. Bốn tấm này là "ảnh stock Việt Nam", và người đọc đã thấy chúng ở 500 trang khác — chúng làm trang *giống AI hơn*, không ít hơn.
- Ảnh AI sinh ra. Người xem bây giờ nhận ra ngay, và với một trang đang cố tỏ ra đáng tin về giá vé thì đó là tự sát.

### Nên làm

1. **Kết cấu thay vì ảnh.** Bản này không dùng một tấm ảnh nào mà vẫn không trống, nhờ hai lớp dựng bằng SVG/CSS, nặng 0 KB:
   - vân giấy dó (`feTurbulence`, opacity 5.5%) phủ toàn trang;
   - vân cói/nón lá (hai lớp `repeating-linear-gradient` chéo 58°) chỉ nằm trên mảng men.
2. **Ảnh phải là bằng chứng, không phải trang trí.** Một tấm ảnh có giá trị trên trang này là: ảnh chụp cái biển ghi giá ở quầy vé, ảnh khoang giường nằm chụp từ chỗ ngồi thật, ảnh mặt tiền số 12 Lê Thái Tổ để người ta nhận ra khi đến. Ảnh xấu mà thật thì thắng ảnh đẹp mà chung chung — vì nó chứng minh bạn đã ở đó.
3. **Xử lý ảnh cho đồng bộ:** duotone `muc → giay`, hoặc `men → giay`; góc vuông; viền 2px `muc`; không bo, không bóng mềm. Chú thích bằng mono, có ghi tháng chụp.
4. **Chụp bằng điện thoại, dọc, ban ngày.** Đừng cố làm ảnh tạp chí.

Nếu chưa có ảnh: **giữ nguyên bản không ảnh.** Nó vẫn đứng vững. Ảnh stock sẽ làm nó tệ đi.

## 5. Nội dung — cách viết cho không giống AI

Bản cũ hỏng ở chỗ này nặng hơn ở thiết kế. Khách sạn tên là "Town-centre hostel". Giá là "~$14/night". Không có địa chỉ, không có tên nhà xe, không có ngày kiểm giá. Đó chính xác là thứ một mô hình ngôn ngữ viết ra khi chưa từng đến nơi.

### Sáu quy tắc bắt buộc cho mọi bài

1. **Đồng trước, đô sau.** `450.000₫ ≈ $18`. Người ở Việt Nam nghĩ bằng đồng; viết bằng đồng chứng tỏ bạn ở đây.
2. **Tên thật.** Nhà xe: Sapa Express, Interbus Lines, HK Buslines, Sao Việt. Bến: Mỹ Đình, Nước Ngầm. Địa chỉ: 12 Lê Thái Tổ, 96 Võ Chí Công. Không bao giờ dùng "a reputable operator".
3. **Dấu tiếng Việt đúng ở địa danh.** *Hà Nội, Sa Pa, Lào Cai, Tả Van, Ô Quy Hồ.* Cực rẻ để làm, và là tín hiệu bản địa mạnh nhất trên trang.
4. **Một đoạn "cái mà hướng dẫn khác không nói".** Chỗ đón thật ra là điểm trung chuyển. Tài xế gọi trước 10 phút và đọc tên bạn đúng một lần. Cởi giày cho vào túi nilon. Không mô hình nào bịa ra được những chi tiết này — và chính chúng làm người đọc tin phần giá.
5. **Dấu kiểm giá.** `KIỂM TRA 08 · 2026` in ngay trên bảng tuyến. Nói thẳng giá là tham khảo. Đây vừa là trung thực, vừa là tín hiệu độ tươi cho Google.
6. **Một câu tiếng Việt dùng được**, kèm phiên âm cho người Anh ngữ. Khối `<SayIt>`. Đây là thứ người đọc chụp màn hình — và ảnh chụp màn hình là marketing miễn phí.

### Giọng

Ngôi thứ nhất số nhiều, có chính kiến, dám chê. *"This is what we book."* *"It is the better story and the worse journey."* Một bài dám nói tàu hoả dở hơn xe thì đáng tin hơn mười bài khen đều.

## 6. Việc phải làm, theo thứ tự

1. **Sửa nav trước khi làm gì khác.** Hiện 9/10 mục dẫn tới 404. Cắt `lib/nav.ts` xuống đúng những gì đã tồn tại, thêm dần khi có trang.
2. **Gắn mã affiliate.** 60 nút đang trỏ tới link trần. Làm một `lib/aff.ts` duy nhất: `aff("12go", path)` → link có ID. Không bao giờ dán link thẳng vào MDX nữa.
3. **Thay tên khách sạn giả bằng tên thật.** Trong `content/hanoi-to-sa-pa.mdx` tôi để `TÊN KHÁCH SẠN THẬT` viết hoa cho bạn không bỏ sót.
4. **Thêm `app/sitemap.ts`, `app/robots.ts`, JSON-LD `Article`, `not-found.tsx`, footer + trang Affiliate disclosure.**
5. **Kiểm lại giá.** Con số trong bài mẫu lấy từ nguồn tháng 5–8/2026 và chỉ là khoảng tham khảo. Trước khi đăng phải mở trang đặt vé xác minh, rồi cập nhật trường `checked`.

## 7. File trong gói này

| File | Việc |
|---|---|
| `preview.html` | Mở trên điện thoại để xem toàn bộ hướng — không cần cài gì |
| `vietnamguider/tailwind.config.ts` | Bảng màu, ba vai chữ, bóng khắc gỗ |
| `vietnamguider/app/globals.css` | Vân giấy dó, vân cói, tabular-nums |
| `vietnamguider/app/layout.tsx` | Ba font kèm subset `vietnamese` |
| `vietnamguider/components/Header.tsx` | Biển men, giữ nguyên `lib/nav.ts` |
| `vietnamguider/components/RouteBoard.tsx` | Bảng tuyến + khối `SayIt` |
| `vietnamguider/components/StayLedger.tsx` | Sổ chỗ ở |
| `vietnamguider/content/hanoi-to-sa-pa.mdx` | Bài mẫu theo giọng mới |

`RouteBoard` và `StayLedger` thay cho `RouteComparisonCard` và `HotelRecommendationCard`. Nhớ sửa map component trong `app/blog/[slug]/page.tsx`:

```ts
import RouteBoard, { SayIt } from "@/components/RouteBoard";
import StayLedger from "@/components/StayLedger";
const components = { RouteBoard, SayIt, StayLedger };
```
