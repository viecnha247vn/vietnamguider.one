# Nguồn ảnh tự do bản quyền cho 20 điểm đến

## Đọc 60 giây này trước khi lấy ảnh

Có ba mức giấy phép, và chúng KHÔNG như nhau:

| Giấy phép | Dùng thương mại | Phải ghi công | Sửa ảnh được không |
|---|---|---|---|
| **CC0 / Public domain** | Được | Không bắt buộc | Thoải mái |
| **CC BY** | Được | **Bắt buộc** | Được |
| **CC BY-SA** | Được | **Bắt buộc** | Được, nhưng **bản đã sửa phải phát hành lại cùng giấy phép** |
| CC BY-**NC** | **KHÔNG** | — | — |

**Hãy ưu tiên CC0 và Public domain.** Trang của bạn có link kiếm tiền nên CC BY-NC là cấm tuyệt đối — nhiều người nhầm chỗ này. Và nếu bạn định xử lý ảnh duotone cho khớp giao diện, thì CC BY-SA sẽ buộc bạn phát hành bản duotone đó cũng dưới CC BY-SA. Chọn CC0 là hết phiền.

**Ghi công phải ghi tên NGƯỜI CHỤP GỐC, không phải người tải lên Wikimedia.** Hai người này thường khác nhau. Tên người chụp nằm ở dòng `Author` trong phần Summary của trang file.

**Mẹo:** trên Wikimedia Commons, mở trang file rồi bấm **"Use this file on the web"** — nó sinh sẵn đoạn ghi công cho bạn copy. Trong ô lọc của Media Search, chọn **License → Unrestricted** để chỉ hiện ảnh CC0/PD.

**Tự host, đừng hotlink.** Tải ảnh về, bỏ vào `public/destinations/`, rồi trỏ `src: "/destinations/sa-pa.jpg"`. Hotlink thẳng từ Wikimedia là làm phiền họ và ảnh có thể biến mất bất cứ lúc nào.

---

## CÁCH NHANH NHẤT: chạy một câu lệnh

Không phải làm tay 20 lần. Trong thư mục `vietnamguider`:

```
npm run photos:dry     # xem trước sẽ lấy ảnh nào, chưa tải gì
npm run photos         # tải thật + tự điền ghi công
```

Script sẽ:

1. Hỏi Wikimedia Commons theo từ khoá riêng cho từng điểm đến (đã chọn sao cho ra đúng cảnh đặc trưng, không ra ảnh chung chung).
2. **Lọc giấy phép**: chỉ nhận CC0 / Public domain / CC BY / CC BY-SA. Loại thẳng mọi thứ có **NC** (phi thương mại) hoặc **ND** (cấm sửa).
3. Tải bản rộng 1600px về `public/destinations/<slug>.jpg`.
4. Ghi tên người chụp thật, giấy phép và link file gốc vào `lib/destination-photos.json`.

Trang tự đọc file JSON đó. **Bạn không phải sửa dòng code nào.**

Muốn tuyệt đối an toàn thì dùng `npm run photos:cc0` — chỉ lấy CC0 và Public domain, không cần ghi công, sửa ảnh thoải mái. Đổi lại số ảnh tìm được sẽ ít hơn.

### Bắt buộc: xem lại bằng mắt

Script lấy kết quả hợp lệ đầu tiên. Giấy phép thì chắc chắn đúng, nhưng ảnh có thể xấu hoặc không đúng cảnh bạn muốn. Chạy `npm run dev`, mở `/destinations`, xem qua 20 ô.

Ô nào không ưng: mở link Commons ở bảng dưới, chọn ảnh khác, rồi sửa thẳng mục đó trong `lib/destination-photos.json`. Chạy lại `npm run photos` sẽ **không** ghi đè những mục bạn đã sửa nếu bạn dùng `--only=<slug>` cho các mục còn lại.

### Nếu script chạy hỏng

Nó gọi thẳng API công khai của Wikimedia, không cần khoá, không cài gói nào. Nếu mạng công ty hoặc VPN chặn thì làm tay theo bảng bên dưới.

---

## Bảng tra cho từng điểm đến (làm tay, nếu cần)

Cột cuối là gợi ý **chụp cái gì cho ra chất nơi đó** — tránh ảnh chung chung mà trang nào cũng có.

| Điểm đến | Miền | Wikimedia Commons | PxHere (CC0) | Nên tìm hình gì |
|---|---|---|---|---|
| **Sa Pa** | The North | [tìm](https://commons.wikimedia.org/wiki/Special:MediaSearch?type=image&search=Sa%20Pa) | [tìm](https://pxhere.com/en/photos?q=Sa%20Pa) | Ruộng bậc thang thung lũng Mường Hoa; Hàm Rồng |
| **Ninh Bình** | The North | [tìm](https://commons.wikimedia.org/wiki/Special:MediaSearch?type=image&search=Tam%20Coc%20Ninh%20Binh) | [tìm](https://pxhere.com/en/photos?q=Tam%20Coc%20Ninh%20Binh) | Sông Tam Cốc; Tràng An; đỉnh Hang Múa |
| **Hà Giang** | The North | [tìm](https://commons.wikimedia.org/wiki/Special:MediaSearch?type=image&search=Ha%20Giang) | [tìm](https://pxhere.com/en/photos?q=Ha%20Giang) | Đèo Mã Pí Lèng; cao nguyên đá Đồng Văn |
| **Cát Bà** | The North | [tìm](https://commons.wikimedia.org/wiki/Special:MediaSearch?type=image&search=Cat%20Ba%20Island) | [tìm](https://pxhere.com/en/photos?q=Cat%20Ba%20Island) | Vịnh Lan Hạ; cảng thị trấn Cát Bà |
| **Mai Châu** | The North | [tìm](https://commons.wikimedia.org/wiki/Special:MediaSearch?type=image&search=Mai%20Chau) | [tìm](https://pxhere.com/en/photos?q=Mai%20Chau) | Thung lũng Mai Châu; nhà sàn bản Lác |
| **Hạ Long** | The North | [tìm](https://commons.wikimedia.org/wiki/Special:MediaSearch?type=image&search=Ha%20Long%20Bay) | [tìm](https://pxhere.com/en/photos?q=Ha%20Long%20Bay) | Núi đá vôi; thuyền buồm neo đậu |
| **Mộc Châu** | The North | [tìm](https://commons.wikimedia.org/wiki/Special:MediaSearch?type=image&search=Moc%20Chau) | [tìm](https://pxhere.com/en/photos?q=Moc%20Chau) | Đồi chè; mùa hoa mận |
| **Cao Bằng** | The North | [tìm](https://commons.wikimedia.org/wiki/Special:MediaSearch?type=image&search=Ban%20Gioc%20Waterfall) | [tìm](https://pxhere.com/en/photos?q=Ban%20Gioc%20Waterfall) | Thác Bản Giốc; động Ngườm Ngao |
| **Hội An** | Central | [tìm](https://commons.wikimedia.org/wiki/Special:MediaSearch?type=image&search=Hoi%20An) | [tìm](https://pxhere.com/en/photos?q=Hoi%20An) | Chùa Cầu; đèn lồng trên sông Thu Bồn |
| **Huế** | Central | [tìm](https://commons.wikimedia.org/wiki/Special:MediaSearch?type=image&search=Hue%20Vietnam) | [tìm](https://pxhere.com/en/photos?q=Hue%20Vietnam) | Kinh thành; chùa Thiên Mụ; lăng tẩm |
| **Đà Nẵng** | Central | [tìm](https://commons.wikimedia.org/wiki/Special:MediaSearch?type=image&search=Da%20Nang) | [tìm](https://pxhere.com/en/photos?q=Da%20Nang) | Biển Mỹ Khê; cầu Rồng; đèo Hải Vân |
| **Phong Nha** | Central | [tìm](https://commons.wikimedia.org/wiki/Special:MediaSearch?type=image&search=Phong%20Nha) | [tìm](https://pxhere.com/en/photos?q=Phong%20Nha) | Động Phong Nha; động Thiên Đường |
| **Quy Nhơn** | Central | [tìm](https://commons.wikimedia.org/wiki/Special:MediaSearch?type=image&search=Quy%20Nhon) | [tìm](https://pxhere.com/en/photos?q=Quy%20Nhon) | Bãi Kỳ Co; tháp Chăm Bánh Ít |
| **Nha Trang** | Central | [tìm](https://commons.wikimedia.org/wiki/Special:MediaSearch?type=image&search=Nha%20Trang) | [tìm](https://pxhere.com/en/photos?q=Nha%20Trang) | Vịnh và các đảo; tháp Bà Po Nagar |
| **Đà Lạt** | The South | [tìm](https://commons.wikimedia.org/wiki/Special:MediaSearch?type=image&search=Da%20Lat) | [tìm](https://pxhere.com/en/photos?q=Da%20Lat) | Rừng thông; hồ Xuân Hương; nông trại cà phê |
| **Mũi Né** | The South | [tìm](https://commons.wikimedia.org/wiki/Special:MediaSearch?type=image&search=Mui%20Ne) | [tìm](https://pxhere.com/en/photos?q=Mui%20Ne) | Đồi cát đỏ và trắng; cảng cá |
| **Phú Quốc** | The South | [tìm](https://commons.wikimedia.org/wiki/Special:MediaSearch?type=image&search=Phu%20Quoc) | [tìm](https://pxhere.com/en/photos?q=Phu%20Quoc) | Bãi Sao; làng chài Hàm Ninh |
| **Hồ Chí Minh City** | The South | [tìm](https://commons.wikimedia.org/wiki/Special:MediaSearch?type=image&search=Ho%20Chi%20Minh%20City) | [tìm](https://pxhere.com/en/photos?q=Ho%20Chi%20Minh%20City) | Chợ Bến Thành; phố xá; toà Bitexco |
| **Cần Thơ** | The South | [tìm](https://commons.wikimedia.org/wiki/Special:MediaSearch?type=image&search=Can%20Tho) | [tìm](https://pxhere.com/en/photos?q=Can%20Tho) | Chợ nổi Cái Răng lúc rạng sáng; bến Ninh Kiều |
| **Côn Đảo** | The South | [tìm](https://commons.wikimedia.org/wiki/Special:MediaSearch?type=image&search=Con%20Dao) | [tìm](https://pxhere.com/en/photos?q=Con%20Dao) | Bờ biển Côn Sơn; nhà tù cũ; bãi vắng |
---

## Cách gắn ảnh vào trang

Mở `lib/destinations.ts`, thêm trường `photo` cho điểm đến:

```ts
{
  name: "Sa Pa",
  region: "The North",
  blurb: "Rice terraces at 1,600 m, and the valley villages below the town.",
  guide: "/blog/hanoi-to-sa-pa",
  photo: {
    src: "/destinations/sa-pa.jpg",
    credit: "Tên người chụp gốc",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:....jpg",
    alt: "Rice terraces in the Mường Hoa valley below Sa Pa",
  },
},
```

Xong. Component `DestinationStamp` tự render ảnh kèm dòng ghi công ở đáy.

**Hàng rào cố ý:** thiếu `credit` hoặc `license` thì component **không hiện ảnh** mà quay về bản chữ. Bạn không thể vô tình đăng ảnh thiếu ghi công.

---

## Nguồn tốt nhất vẫn là ảnh bạn tự chụp

Ảnh Commons của Sa Pa cũng là ảnh mà mọi trang khác dùng. Một tấm chụp bằng điện thoại tại quầy vé Mỹ Đình, hay khoang giường nằm chụp từ chỗ ngồi thật, có giá trị hơn — vì nó chứng minh bạn đã ở đó, và không ai khác có nó.
