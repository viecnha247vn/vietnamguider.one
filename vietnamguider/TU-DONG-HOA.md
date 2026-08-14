# Tự động hoá marketing bằng AI — làm gì và không làm gì

## Nguyên tắc duy nhất

**Tự động hoá ĐẦU VÀO và VẬN HÀNH. Không tự động hoá ĐẦU RA.**

Google gọi thẳng thứ nó phạt là *scaled content abuse* — nội dung xuất bản số lượng lớn qua AI mà không có giá trị gốc. Đợt cập nhật cuối tháng 6/2026 nhắm đúng "trang tin sản xuất hàng loạt bằng AI" và "trang affiliate thống trị từ khoá so sánh mà không kiểm chứng thật", mức mất 40–80%.

Dùng AI viết 40 bài trong một tháng không phải tăng tốc. Đó là tự dán lên trán đúng cái nhãn thuật toán đang đi tìm.

Nhưng quanh phần viết có rất nhiều việc nặng, lặp lại, ít phán đoán. Đó mới là chỗ đáng tự động.

---

## Được — và nên làm ngay

### 1. Kiểm tra sức khoẻ trang (đã dựng sẵn)

```
npm run audit
```

Quét toàn bộ: dấu kiểm giá quá hạn, chỗ giữ chỗ chưa thay, bài thiếu giá bằng đồng, bài thiếu tên nhà xe, điểm đến chưa có ảnh, menu trỏ vào trang chết. Không viết một chữ nào — chỉ nói chỗ nào cần bàn tay người.

Chạy mỗi thứ Hai. Gắn vào GitHub Actions thì nó tự chạy và báo.

### 2. Chuẩn bị cho vòng kiểm giá 90 ngày

Hào cạnh tranh của bạn là kỷ luật kiểm giá — nhưng đó là lao động chân tay. Tự động hoá phần **chuẩn bị**, không phải phần **kết luận**:

- Script mở trang đặt vé của từng nhà xe, chụp lại giá hiện tại vào một bảng.
- Bạn nhìn bảng, đối chiếu, xác nhận, rồi mới cập nhật bài và đổi dấu `checked`.

**Tuyệt đối không để script tự sửa dấu `checked`.** Dấu đó có nghĩa "một con người đã mở trang và nhìn". Để máy bump ngày là lừa người đọc, và phá huỷ đúng thứ tài sản duy nhất bạn có. Đây là ranh giới không được bước qua.

*Lưu ý pháp lý:* điều khoản nhiều trang đặt vé cấm cào dữ liệu tự động. Kiểm điều khoản trước, hoặc dùng API chính thức nếu có.

### 3. Khai thác dữ liệu Search Console — chỗ AI mạnh nhất

Kéo dữ liệu GSC hàng tuần qua API, đưa cho AI phân tích. Ba câu hỏi đáng tiền:

- Truy vấn nào **có impression nhưng không có click**? → tiêu đề hoặc mô tả sai ý định.
- Truy vấn nào đang ở **vị trí 8–20**? → gần lọt trang 1, sửa nhẹ là lên.
- Trang nào **mất impression** so với tháng trước? → dấu hiệu sớm của cập nhật thuật toán.

Đây là phân tích, không phải sáng tác. AI làm rất tốt và không có rủi ro gì.

### 4. Săn "truy vấn ma sát" — cửa thắng của bạn

Chiến lược SEO xếp loại B (câu hỏi chưa ai trả lời) là 50% công sức. Tìm chúng bằng máy:

- Quét r/VietNam, r/travel, TripAdvisor forum, tìm câu hỏi lặp lại về đi lại.
- Nhóm theo chủ đề, đếm tần suất.
- Kết quả: danh sách câu hỏi thật, bằng chữ của người thật.

AI làm phần đọc và gom nhóm. **Bạn** viết câu trả lời, vì câu trả lời cần bạn đã ngồi trên chiếc xe đó.

### 5. AI làm BIÊN TẬP, không làm TÁC GIẢ

Đây là cách dùng hợp lệ và mạnh nhất:

1. Bạn ngồi trên xe, ghi âm 3 phút những gì đang xảy ra.
2. AI gỡ băng, sắp vào đúng khuôn bài (bảng tuyến, "cái mà hướng dẫn khác không nói", "Nói thế nào").
3. Bạn đọc lại, sửa, đăng.

Sự thật vẫn là của bạn — thứ Google không tổng hợp được. AI chỉ bỏ đi phần gõ phím. **Đây mới là tăng tốc thật.**

### 6. Kiểm tra được AI trích dẫn

Mỗi quý, chạy 20 truy vấn mục tiêu và ghi lại có được trích trong AI Overview không. Trang được trích nhận thêm ~35% lượt nhấp so với vị trí 1 thường — nên đây là chỉ số quan trọng hơn thứ hạng.

### 7. Việc kỹ thuật lặp lại

Kiểm schema hợp lệ, tìm trang mồ côi không ai trỏ tới, gợi ý liên kết nội bộ, nén ảnh, tạo alt text nháp. Toàn việc máy làm tốt hơn người.

---

## Không được — và vì sao

| Việc | Hậu quả |
|---|---|
| **AI viết bài rồi đăng thẳng** | Đúng dấu vân tay bị phạt. 71% trang affiliate tụt hạng năm 2026. |
| **Sinh hàng loạt trang "A đi B"** | Trang theo khuôn, tín hiệu chuyên môn rỗng — nhóm mất 40–80%. |
| **Bot tự sửa dấu `checked`** | Lừa người đọc, và phá huỷ tài sản duy nhất của bạn. |
| **Tự động đăng lên Reddit** | Bị khoá tài khoản, và mất uy tín vĩnh viễn trong đúng cộng đồng bạn cần. |
| **Guest post hàng loạt / PBN** | Nằm trong danh sách bị phạt đợt tháng 6/2026. |
| **AI viết đánh giá nhà xe** | Bịa trải nghiệm. Sai đạo đức, và người đọc nhận ra ngay. |
| **Dịch máy sang tiếng Việt rồi đăng** | Nội dung dịch máy hàng loạt bị coi là nội dung mỏng. |

---

## Bảng phân vai

| Việc | Máy | Người |
|---|---|---|
| Tìm câu hỏi chưa ai trả lời | ✔ | duyệt |
| Kéo giá hiện tại về bảng | ✔ | **xác nhận** |
| Đổi dấu `checked` | ✘ | **chỉ người** |
| Gỡ băng ghi âm, xếp vào khuôn | ✔ | biên tập |
| Viết đoạn "cái thực sự xảy ra" | ✘ | **chỉ người** |
| Phân tích GSC | ✔ | quyết định |
| Kiểm schema, liên kết, ảnh | ✔ | — |
| Trả lời trên Reddit | ✘ | **chỉ người** |
| Viết bản tin email | soạn nháp | duyệt và gửi |

---

## Thứ tự triển khai

**Tuần 1.** `npm run audit` chạy mỗi thứ Hai. Sửa 3 lỗi CHẶN đang có.

**Tuần 2–3.** Nối Google Search Console API. Thiết lập báo cáo tuần: impression, truy vấn vị trí 8–20, trang mất impression.

**Tuần 4.** Chạy đợt săn truy vấn ma sát đầu tiên. Mục tiêu 50 câu hỏi thật, xếp theo tần suất.

**Tháng 2.** Thử quy trình ghi âm → gỡ băng → khuôn bài trên một tuyến. Đo xem viết một bài mất bao lâu so với trước.

**Tháng 3.** Dựng bảng theo dõi giá bán tự động. Vẫn xác nhận bằng tay.

---

## Câu hỏi tự kiểm trước khi tự động hoá bất cứ việc gì

> *Nếu người đọc biết việc này do máy làm, họ có thấy bị lừa không?*

Gom câu hỏi từ Reddit — không. Phân tích GSC — không. Gỡ băng ghi âm của chính bạn — không.

Viết đoạn "tài xế sẽ gọi bạn trước 10 phút" mà chưa ai từng nhận cuộc gọi đó — **có**. Và đó chính xác là ranh giới.
