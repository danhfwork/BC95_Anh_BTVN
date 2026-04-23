// Khai báo cơ bản
let danhSachNV = JSON.parse(localStorage.getItem("DSNV")) || [];

const heSoLuongTheoChucVu = {
  "Giám đốc": 3,
  "Trưởng phòng": 2,
  "Nhân viên": 1,
};
const xepLoaiNV = (gioLam) => {
  if (gioLam >= 192) return "Xuất sắc";
  if (gioLam >= 176) return "Giỏi";
  if (gioLam >= 160) return "Khá";
  return "Trung bình";
};

const el = {
  // Sidebar
  sidebar: document.getElementById("sidebar"),
  toggleBtn: document.getElementById("toggleBtn"),
  toggleIcon: document.getElementById("toggleIcon"),
  // PopupThemNhanVien
  popupThemNhanVien: document.getElementById("popupThemNhanVien"),
  overlayNV: document.getElementById("overlayNV"),
  btnThemNhanVien: document.getElementById("btnThemNhanVien"),
  btnCloseThemNhanVien: document.getElementById("btnCloseThemNhanVien"),
  // Search Box
  searchBox: document.getElementById("searchBox"),
  // Form nhân viên
  addNhanVien: document.getElementById("addNhanVien"),
  capNhat: document.getElementById("capNhat"),
  formNhanVien: document.getElementById("formNhanVien"),
  taiKhoan: document.getElementById("taiKhoan"),
  hoTen: document.getElementById("hoTen"),
  email: document.getElementById("email"),
  matKhau: document.getElementById("matKhau"),
  ngayLam: document.getElementById("ngayLam"),
  luongCoBan: document.getElementById("luongCoBan"),
  chucVu: document.getElementById("chucVu"),
  gioLam: document.getElementById("gioLam"),
};

// Render danh sách nhân viên
const renderDanhSachNV = (array = danhSachNV) => {
  const content = array.reduce((html, nv) => {
    return (
      html +
      `
        <tr class="border-t border-gray-200">
          <td class="border-r text-center py-2 border-gray-200">${nv.taiKhoan}</td>
          <td class="border-r text-center py-2 border-gray-200">${nv.hoTen}</td>
          <td class="border-r text-center py-2 border-gray-200">${nv.email}</td>
          <td class="border-r text-center py-2 border-gray-200">${nv.ngayLam}</td>
          <td class="border-r text-center py-2 border-gray-200">${nv.chucVu}</td>                  
          <td class="border-r text-center py-2 border-gray-200">${(nv.luongCoBan * heSoLuongTheoChucVu[nv.chucVu]).toLocaleString("vi-VN") + " VNĐ"}</td>
          <td class="border-r text-center py-2 border-gray-200">${xepLoaiNV(nv.gioLam)}</td>
          <td class="border-r text-center py-2 border-gray-200">
            <button onclick="editNV('${nv.taiKhoan}')" type="button" aria-label="editNV" class="text-white bg-green-500 w-6 h-6 cursor-pointer"><i class="fa-solid fa-pencil"></i></button>
            <button onclick="deleteNV('${nv.taiKhoan}')" type="button" aria-label="deleteNV" class="text-white bg-red-500 w-6 h-6 cursor-pointer"><i class="fa-solid fa-x"></i></button>
          </td>
        </tr>
      `
    );
  }, "");
  document.getElementById("tableDanhSachNV").innerHTML = content;
};

renderDanhSachNV();
// LOGIC POPUP
// Ẩn/Hiện Form thêm nhân viên
const modalPopup = () => {
  el.popupThemNhanVien.classList.remove("hidden");
};

const closeModal = () => {
  el.popupThemNhanVien.classList.add("hidden");
  el.formNhanVien.reset();
  el.taiKhoan.readOnly = false;
};
// Show Message
const showMessage = (title, icon = "success", callback = null) => {
  if (callback) {
    Swal.fire({
      title: title,
      text: "Hành động này không thể hoàn tác!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Đồng ý!",
      cancelButtonText: "Hủy",
    }).then((result) => {
      if (result.isConfirmed) {
        callback();
      }
    });
  } else {
    const Toast = Swal.mixin({
      toast: true,
      position: "center",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
    });

    Toast.fire({
      icon: icon,
      title: title,
    });
  }
};

el.btnThemNhanVien.addEventListener("click", modalPopup);
el.btnCloseThemNhanVien.addEventListener("click", closeModal);
el.overlayNV.addEventListener("click", closeModal);

// Toggle Sidebar
el.toggleBtn.addEventListener("click", () => {
  el.sidebar.classList.toggle("w-64");
  el.sidebar.classList.toggle("w-20");
  el.sidebar.classList.toggle("collapsed");
  el.toggleIcon.classList.toggle("rotate-180");
});

// Validation

class validation {
  static isEmpty(value) {
    return !value || value.trim().length === 0;
  }
  static isEmail(value) {
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(value);
  }
  static isPassword(value) {
    const re =
      /^(?=.*[0-9])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,10}$/;
    return re.test(value);
  }

  static isNumberInRange(value, min, max) {
    const num = Number(value);
    return num >= min && num <= max;
  }
}

const validationInputForm = (nhanVien) => {
  const { taiKhoan, hoTen, email, matKhau, luongCoBan, chucVu, gioLam } =
    nhanVien;
  const errors = {};

  if (validation.isEmpty(taiKhoan) || !/^\d{4,6}$/.test(taiKhoan)) {
    errors.taiKhoan = "Tài khoản từ 4-6 ký số, không để trống";
  }

  if (validation.isEmpty(hoTen) || !/^[A-Z a-zÀ-ỹ]+$/.test(hoTen)) {
    errors.hoTen = "Tên phải là chữ, không để trống";
  }

  if (!validation.isEmail(email)) {
    errors.email = "Email không đúng định dạng";
  }

  if (!validation.isPassword(matKhau)) {
    errors.matKhau = "Mật khẩu 6-10 ký tự (1 số, 1 in hoa, 1 đặc biệt)";
  }

  if (!validation.isNumberInRange(luongCoBan, 1000000, 20000000)) {
    errors.luongCoBan = "Lương từ 1.000.000 đến 20.000.000";
  }

  if (validation.isEmpty(chucVu)) {
    errors.chucVu = "Vui lòng chọn chức vụ hợp lệ";
  }

  if (!validation.isNumberInRange(gioLam, 80, 200)) {
    errors.gioLam = "Số giờ làm từ 80 - 200 giờ";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

// Hanlde thêm nhân viên

const handleAdd = () => {
  // Lấy dữ liệu từ Form
  const form = el.formNhanVien;
  const formData = new FormData(form);
  const nhanVienMoi = Object.fromEntries(formData.entries());

  // Validation
  const { isValid, errors } = validationInputForm(nhanVienMoi);
  // Clear lỗi, tránh trùng lặp
  const errorSpans = document.querySelectorAll("[id^='error-']");
  errorSpans.forEach((span) => (span.innerHTML = ""));

  if (!isValid) {
    Object.keys(errors).forEach((key) => {
      document.getElementById(`error-${key}`).innerHTML = errors[key];
    });
    return;
  }
  if (isValid) {
    danhSachNV.push(nhanVienMoi);
    localStorage.setItem("DSNV", JSON.stringify(danhSachNV));
    renderDanhSachNV();
    closeModal();
  }
};

el.addNhanVien.addEventListener("click", handleAdd);

// Sửa và Xóa nhân viên

const editNV = (taiKhoanNV) => {
  const nvCanSua = danhSachNV.find((nv) => nv.taiKhoan === taiKhoanNV);

  if (!nvCanSua) return;

  modalPopup();

  el.taiKhoan.value = nvCanSua.taiKhoan;
  el.hoTen.value = nvCanSua.hoTen;
  el.email.value = nvCanSua.email;
  el.matKhau.value = nvCanSua.matKhau;
  el.ngayLam.value = nvCanSua.ngayLam;
  el.luongCoBan.value = nvCanSua.luongCoBan;
  el.chucVu.value = nvCanSua.chucVu;
  el.gioLam.value = nvCanSua.gioLam;
  el.taiKhoan.readOnly = true;
  el.addNhanVien.classList.add("hidden");
  el.capNhat.classList.remove("hidden");
};

const capNhat = () => {
  const form = el.formNhanVien;
  const formData = new FormData(form);
  const updateData = Object.fromEntries(formData.entries());

  // Validation
  const { isValid, errors } = validationInputForm(updateData);
  // Clear lỗi, tránh trùng lặp
  const errorSpans = document.querySelectorAll("[id^='error-']");
  errorSpans.forEach((span) => (span.innerHTML = ""));

  if (!isValid) {
    Object.keys(errors).forEach((key) => {
      document.getElementById(`error-${key}`).innerHTML = errors[key];
    });
    return;
  }
  const index = danhSachNV.findIndex(
    (nv) => nv.taiKhoan === updateData.taiKhoan,
  );
  if (index !== -1) {
    danhSachNV[index] = updateData;
    localStorage.setItem("DSNV", JSON.stringify(danhSachNV));
    renderDanhSachNV();
    showMessage("Cập nhật nhân viên thành công!");
    closeModal();
  }
};

const deleteNV = (taiKhoanNV) => {
  showMessage(
    `Bạn có chắc chắn muốn xóa nhân viên ${taiKhoanNV} không?`,
    "warning",
    () => {
      danhSachNV = danhSachNV.filter((nv) => nv.taiKhoan != taiKhoanNV);
      localStorage.setItem("DSNV", JSON.stringify(danhSachNV));
      renderDanhSachNV();
      showMessage("Đã xóa thành công!", "success");
    },
  );
};

// Tìm nhân viên theo xếp loại
const filterNV = () => {
  const keyword = el.searchBox.value.toLowerCase().trim();
  const ketQua = danhSachNV.filter((nv) => {
    const loai = xepLoaiNV(nv.gioLam).toLowerCase();
    return loai.includes(keyword);
  });
  renderDanhSachNV(ketQua);
};
