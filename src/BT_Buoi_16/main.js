// Lấy và hiển thị mảng dữ liệu
let mainArr = [];
const inputElement = document.getElementById("inputArr");

const getArr = () => {
  const inputArr = inputElement?.value || "";
  mainArr = inputArr
    .split(",")
    .map((x) => x.trim())
    .filter(Boolean)
    .map(Number)
    .filter(Number.isFinite);
  if (inputElement) {
    inputElement.value = "";
  }
  return mainArr;
};

const arrDisplay = () => {
  document.getElementById("arrDisplay").innerText =
    `Mảng hiện tại là: [ ${mainArr.join(", ")} ]`;
};

const btnAddArr = document.getElementById("btnAddArr");
btnAddArr.addEventListener("click", getArr);
btnAddArr.addEventListener("click", arrDisplay);

// --------------------------------------------------------------------------------------------------------------------------
// Reset dữ liệu để người dùng nhập mảng mới nhanh chóng
const reset = () => {
  mainArr = [];
  arrDisplay();
  inputElement.focus();
  document.getElementById("resultOutput").innerHTML =
    "Mời bạn nhập mảng và chọn chức năng tính toán!";
};

// --------------------------------------------------------------------------------------------------------------------------
//Modal Input cho BT6 và BT9
const modal = {
  el: document.getElementById("customModal"),
  title: document.getElementById("modalTitle"),
  desc: document.getElementById("modalDescription"),
  inputs: document.getElementById("modalInputs"),
  confirmBtn: document.getElementById("modalConfirmBtn"),

  open: (config) => {
    modal.title.innerText = config.title;
    modal.desc.innerText = config.desc;
    modal.inputs.innerHTML = config.inputsHTML;
    modal.el.classList.remove("hidden");
    modal.confirmBtn.onclick = () => {
      config.onConfirm();
      modal.close();
    };
  },

  close: () => {
    modal.el.classList.add("hidden");
  },
};

const closeModal = () => modal.close();

// --------------------------------------------------------------------------------------------------------------------------
// Function Logic
const functionLogic = {
  sumPositives: (arr) =>
    arr.reduce((sum, num) => (num > 0 ? sum + num : sum), 0),
  countPositives: (arr) => arr.filter((n) => n > 0).length,
  findMin: (arr) => (arr.length ? Math.min(...arr) : null),
  findMinPositive: (arr) => {
    const positives_4 = arr.filter((n) => n > 0);
    return positives_4.length
      ? Math.min(...positives_4)
      : "Trong mảng không tồn tại số dương";
  },
  findLastEven: (arr) => {
    for (let i = arr.length - 1; i >= 0; i--) {
      if (arr[i] % 2 === 0) return arr[i];
    }
    return -1;
  },
  swapPositions: (arr, pos1, pos2) => {
    const swapArr = [...arr];
    if (pos1 >= 0 && pos1 < arr.length && pos2 >= 0 && pos2 < arr.length) {
      [swapArr[pos1], swapArr[pos2]] = [swapArr[pos2], swapArr[pos1]];
    }
    return swapArr;
  },
  sortAscending: (arr) => [...arr].sort((a, b) => a - b),
  isPrime: (num) => {
    if (num < 2) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
      if (num % 2 === 0) return false;
    }
    return true;
  },
  findFirstPrime: (arr) => arr.find((num) => functionLogic.isPrime(num)) ?? -1,
  countInt: (arr) => arr.filter((num) => Number.isInteger(num)).length,
  comparePosNeg: (arr) => {
    const positives_10 = arr.filter((num) => num > 0).length;
    const negative_10 = arr.filter((num) => num < 0).length;
    if (positives_10 > negative_10) return `Số dương nhiều hơn số âm`;
    if (positives_10 < negative_10) return `Số âm nhiều hơn số dương`;
    return `Số dương bằng số âm`;
  },
};

// -----------------------------------------------------------------------------------------------------------------
// Validation
const checkEmptyArr = () => {
  if (mainArr.length === 0) {
    alert("Vui lòng nhập mảng số nguyên để thực hiện chức năng!");
    return true;
  }
  return false;
};

// -----------------------------------------------------------------------------------------------------------------
// Render Function Button
const functionsCal = [
  {
    label: "Tính tổng số dương",
    action: () => {
      if (checkEmptyArr()) return;
      showResult(
        `Tổng các số dương của mảng là ${functionLogic.sumPositives(mainArr)}`,
      );
    },
  },
  {
    label: "Đếm số dương",
    action: () => {
      if (checkEmptyArr()) return;
      showResult(`Mảng có ${functionLogic.countPositives(mainArr)} số dương`);
    },
  },
  {
    label: "Tìm số nhỏ nhất",
    action: () => {
      if (checkEmptyArr()) return;
      showResult(`Số nhỏ nhất trong mảng là ${functionLogic.findMin(mainArr)}`);
    },
  },
  {
    label: "Tìm số dương nhỏ nhất",
    action: () => {
      if (checkEmptyArr()) return;
      showResult(
        `Số dương nhỏ nhất trong mảng là ${functionLogic.findMinPositive(mainArr)}`,
      );
    },
  },
  {
    label: "Tìm số chẵn cuối cùng của mảng",
    action: () => {
      if (checkEmptyArr()) return;
      showResult(
        `Số chẵn cuối cùng của mảng là ${functionLogic.findLastEven(mainArr)}`,
      );
    },
  },
  {
    label: "Đổi chỗ (Nhập vị trí)",
    action: () => {
      if (checkEmptyArr()) return;
      modal.open({
        title: "Đổi chỗ phần tử",
        desc: `Nhập 2 vị trí (index) bạn muốn tráo đổi (Từ 0 đến ${mainArr.length - 1})`,
        inputsHTML: `
                    <input id="pos1" type="number" placeholder="Vị trí 1" class="w-full px-4 py-3 border border-transparent focus:border-blue-500 rounded-xl outline-none">
                    <input id="pos2" type="number" placeholder="Vị trí 2" class="w-full px-4 py-3 border border-transparent focus:border-blue-500 rounded-xl outline-none">
                `,
        onConfirm: () => {
          const p1 = parseInt(document.getElementById("pos1").value);
          const p2 = parseInt(document.getElementById("pos2").value);
          mainArr = functionLogic.swapPositions(mainArr, p1, p2);
          showResult(`Đã đổi vị trí ${p1} và ${p2} mảng mới là[ ${mainArr} ]`);
        },
      });
    },
  },
  {
    label: "Sắp xếp các phần tử trong mảng theo thứ tự tăng dần",
    action: () => {
      if (checkEmptyArr()) return;
      mainArr = functionLogic.sortAscending(mainArr);
      showResult(`Mảng mới sau khi sắp xếp là [ ${mainArr} ]`);
    },
  },
  {
    label: "Tìm số nguyên tố đầu tiên",
    action: () => {
      if (checkEmptyArr()) return;
      showResult(
        ` Số nguyên tố đầu tiên trong mảng là ${functionLogic.findFirstPrime(mainArr)}`,
      );
    },
  },
  {
    label: "Đếm số nguyên trong mảng thực",
    action: () => {
      modal.open({
        title: "Thêm mảng số thực",
        desc: "Nhập vào các số thực, cách nhau bởi dấu ','",
        inputsHTML: `<input id="realNumbers" type="text" placeholder="Ví dụ: 1.5, 2, -3.4, 10" class="w-full px-4 py-3 border border-transparent focus:border-blue-500 rounded-xl outline-none">`,
        onConfirm: () => {
          const val = document.getElementById("realNumbers").value;
          const tempArr = val
            .split(",")
            .map((num) => parseFloat(num.trim()))
            .filter((num) => !isNaN(num));
          showResult(
            ` Có ${functionLogic.countInt(tempArr)} số nguyên dương trong mảng bạn vừa nhập`,
          );
        },
      });
    },
  },
  {
    label: "So sánh số dương và số âm",
    action: () => {
      if (checkEmptyArr()) return;
      showResult(functionLogic.comparePosNeg(mainArr));
    },
  },
];

const renderFunctionCal = () => {
  const container = document.getElementById("functionList");
  functionsCal.forEach((f) => {
    const btn = document.createElement("button");
    btn.className =
      "w-full text-left p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:border-indigo-300 hover:bg-indigo-50 transition-all flex justify-between items-center cursor-pointer";
    btn.innerHTML = `
                    <span class="font-medium">${f.label}</span>
                `;
    btn.onclick = f.action;
    container.appendChild(btn);
  });
};

renderFunctionCal();

// --------------------------------------------------------------------------------------------------------------------------
//Show kết quả
const showResult = (message) => {
  const output = document.getElementById("resultOutput");
  output.classList.remove("italic", "text-gray-400");
  output.classList.add("text-blue-500", "font-bold");
  output.innerHTML = message;
};
