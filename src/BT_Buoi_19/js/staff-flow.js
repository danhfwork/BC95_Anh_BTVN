import {
  state,
  el,
  saveStorage,
  heSoLuongTheoChucVu,
  xepLoaiNV,
} from "./core.js";
import { validationInputForm } from "./validation.js";
import { showMessage, closeModal, modalPopup } from "./popup-flow.js";
// Render danh sách nhân viên
export const renderDanhSachNV = (array = state.danhSachNV) => {
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
            <button data-id="${nv.taiKhoan}"  type="button" aria-label="editNV" class="text-white bg-green-500 w-6 h-6 cursor-pointer editNV"><i class="fa-solid fa-pencil"></i></button>
            <button data-id="${nv.taiKhoan}"  type="button" aria-label="deleteNV" class="text-white bg-red-500 w-6 h-6 cursor-pointer deleteNV"><i class="fa-solid fa-x"></i></button>
          </td>
        </tr>
      `
    );
  }, "");
  document.getElementById("tableDanhSachNV").innerHTML = content;
};

// Hanlde thêm nhân viên
export const handleAdd = () => {
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
    state.danhSachNV.push(nhanVienMoi);
    saveStorage();
    renderDanhSachNV();
    closeModal();
  }
};

// Cập nhật và Xóa nhân viên
const editNV = (taiKhoanNV) => {
  const nvCanSua = state.danhSachNV.find((nv) => nv.taiKhoan === taiKhoanNV);

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

export const capNhat = () => {
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
  const index = state.danhSachNV.findIndex(
    (nv) => nv.taiKhoan === updateData.taiKhoan,
  );
  if (index !== -1) {
    state.danhSachNV[index] = updateData;
    saveStorage();
    renderDanhSachNV();
    showMessage("Cập nhật nhân viên thành công!");
    closeModal();
  }
};

export const deleteNV = (taiKhoanNV) => {
  showMessage(
    `Bạn có chắc chắn muốn xóa nhân viên ${taiKhoanNV} không?`,
    "warning",
    () => {
      state.danhSachNV = state.danhSachNV.filter(
        (nv) => nv.taiKhoan != taiKhoanNV,
      );
      saveStorage();
      renderDanhSachNV();
      showMessage("Đã xóa thành công!", "success");
    },
  );
};

// Gắn sự kiện vào thẻ tbody (ví dụ id là tableDanhSach)

export const bindCURDEvents = () => {
  el.tBody.addEventListener("click", (event) => {
    const btnEditNV = event.target.closest(".editNV");
    if (btnEditNV) {
      const id = btnEditNV.getAttribute("data-id");
      editNV(id);
    }
    const btnDeleteNV = event.target.closest(".deleteNV");
    if (btnDeleteNV) {
      const id = btnDeleteNV.getAttribute("data-id");
      deleteNV(id);
    }
  });
  el.btnCapNhat.addEventListener("click", capNhat);
  el.addNhanVien.addEventListener("click", handleAdd);
};
