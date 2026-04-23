
export const state = {
  danhSachNV: JSON.parse(localStorage.getItem("DSNV")) || [],
};

export const heSoLuongTheoChucVu = {
  "Giám đốc": 3,
  "Trưởng phòng": 2,
  "Nhân viên": 1,
};

export const xepLoaiNV = (gioLam) => {
  if (gioLam >= 192) return "Xuất sắc";
  if (gioLam >= 176) return "Giỏi";
  if (gioLam >= 160) return "Khá";
  return "Trung bình";
};

export const el = {
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
  //   Filter
  btnFilterNV: document.getElementById("filterNV"),
  //   Table danh sách nhân viên
  tBody: document.getElementById("tableDanhSachNV"),
  btnCapNhat: document.getElementById("capNhat"),
};

export const saveStorage = () => {
  localStorage.setItem("DSNV", JSON.stringify(state.danhSachNV));
};
