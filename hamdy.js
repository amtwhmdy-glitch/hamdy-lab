// --- 1. كود Vue.js ---
new Vue({
    el: '#app',
    data: {
        showText: true,
        userName: 'Гость',
        selectedPart: 'Процессор — Intel Core i5 (120 000 тг)',
        delivery: 'Да',
        orderMessage: ''
    },
    methods: {
        submitOrder: function() {
            let name = this.userName.trim() || 'Гость';
            this.orderMessage = `Заказ оформлен для ${name}: ${this.selectedPart}. Доставка: ${this.delivery}.`;
        }
    }
});

// --- 2. كود jQuery ---
$(document).ready(function() {

    let table = document.querySelector("table");
    let controls = document.createElement("div");
    controls.style.margin = "16px 0";

    let sortButton = document.createElement("button");
    sortButton.textContent = "Сортировать по цене";

    let addButton = document.createElement("button");
    addButton.textContent = "Добавить деталь";

    let deleteButton = document.createElement("button");
    deleteButton.textContent = "Удалить последнюю деталь";

    let colorButton = document.createElement("button");
    colorButton.textContent = "Темная тема (Dark Mode)";

    controls.appendChild(sortButton);
    controls.appendChild(addButton);
    controls.appendChild(deleteButton);
    controls.appendChild(colorButton);

    table.parentElement.insertBefore(controls, table);

    // قائمة قطع إضافية للتنويع عند الضغط على إضافة قطعة
    const extraParts = [
        { type: "Материнская плата", desc: "Основа для подключения всех компонентов ПК.", name: "ASUS TUF B650", price: "95 000" },
        { type: "Блок питания", desc: "Стабильное питание комплектующих системы.", name: "Corsair RM650 650W", price: "38 000" },
        { type: "Оперативная память", desc: "Дополнительный комплект памяти DDR5.", name: "Corsair Vengeance 32GB", price: "78 000" },
        { type: "Накопитель SSD", desc: "Быстрый накопитель для игр и проектов.", name: "Kingston NV2 2TB", price: "68 000" }
    ];
    let partIndex = 0;

    sortButton.onclick = function() {
        let rows = Array.from(table.querySelectorAll("tr"));
        let dataRows = rows.slice(1);

        dataRows.sort(function(a, b) {
            let priceA = Number(a.cells[2].textContent.replace(/\s/g, ""));
            let priceB = Number(b.cells[2].textContent.replace(/\s/g, ""));
            return priceA - priceB;
        });

        dataRows.forEach(function(row) {
            table.querySelector("tbody").appendChild(row);
        });
    };

    addButton.onclick = function() {
        let item = extraParts[partIndex % extraParts.length];
        partIndex++;

        let newRow = table.insertRow();
        newRow.insertCell(0).textContent = `${item.type} — ${item.desc}`;
        newRow.insertCell(0).className = "col1";
        // ملاحظة: insertRow تضيف صفاً، ولضبط الخلايا بدقة نستخدم insertCell بالترتيب:
        newRow.innerHTML = `
            <td class="col1">${item.type}. ${item.desc}</td>
            <td class="col2">${item.name}</td>
            <td>${item.price}</td>
        `;
    };

    deleteButton.onclick = function() {
        let rows = table.querySelectorAll("tr");
        if (rows.length > 2) {
            table.deleteRow(-1);
        } else {
            alert("Нельзя удалить все детали!");
        }
    };

    $(colorButton).click(function() {
        $("body").toggleClass("dark-mode");

        if ($("body").hasClass("dark-mode")) {
            $(this).text("Светлая тема (Light Mode)");
        } else {
            $(this).text("Темная тема (Dark Mode)");
        }

        $("#cmd-part").fadeOut(200).fadeIn(200);
    });
});