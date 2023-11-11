TOKOHAPEA-MEDIA
By : Muhamad Fadhil Surya Putra




Dialkisahkan teman-teman diminta untuk membuat sebuah applikasi untuk tokohapea dalam pengembangan awalnya teman teman diminta untuk mengembangkan fiturnya sbb : 

- [x] Buat table user dengan field
  - [x] Nama
  - [x] Password
  - [x] Profile_picture
  - [x] email
  - [x] Address
- [ ] Buat table transaction dengan field
  - [ ] User_id (fk ke table user)
  - [ ] amount int
  - [ ] Payment_link berisi string buffer dari QR
  - [ ] Is_paid (default false)
- [ ] Buatkan endpoint register jangan lupa password harus di hash dan email harus di cek unik
- [ ] Buatkan fitur dimana user bisa mengupload profile picture mereka sendiri dan simpan url fotonya ke database Hanya user tersebut yang bisa mengakses atau mengganti foto mereka
- [ ] Buatkan fitur login dan generate token jwt dari setiap login dengan data user_id dan email di dalam tok Ketika register generate token jwt jika berhasil
- [ ] Ketika mengenerate transaction jangan lupa buatkan return payload success dengan membawa payment QR yang berisi data
  - Amount
  - user_id 
- [ ] Buatkan endpoint untuk melakukan CRUD untuk transaction dan pastikan hanya user yg memiliki otoritas yang dapat melakukan CRUD transaction tersebut, gunakan private route untuk endpoint transaction ini Gunakan joi dan morgan serta swagger untuk tugas ini

