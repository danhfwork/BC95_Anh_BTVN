import { state, el, xepLoaiNV } from "./core.js";
import { renderDanhSachNV } from "./staff-flow.js";

// Tìm nhân viên theo xếp loại
export const filterNV = () => {
  const keyword = el.searchBox.value.toLowerCase().trim();
  const ketQua = state.danhSachNV.filter((nv) => {
    const loai = xepLoaiNV(nv.gioLam).toLowerCase();
    return loai.includes(keyword);
  });
  renderDanhSachNV(ketQua);
};

export const bindFilterEvent = () => {
    el.btnFilterNV.addEventListener("click", filterNV)
}