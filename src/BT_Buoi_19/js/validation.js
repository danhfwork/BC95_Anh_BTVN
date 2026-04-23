
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
// Hàm Validation
export const validationInputForm = (nhanVien) => {
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