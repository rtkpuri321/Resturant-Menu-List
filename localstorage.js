const addItems = document.querySelector(".add-items");
      const itemsList = document.querySelector(".plates");
      const items = JSON.parse(localStorage.getItem("items")) || [];

      function addItem(e) {
        e.preventDefault();
        const text = this.querySelector("[name=item]").value;
        const item = {
          text,
          done: false,
        };
        items.push(item);
        populatelist(items, itemsList);
        localStorage.setItem("items", JSON.stringify(items));
        this.reset();
      }

      function populatelist(plates = [], platelist) {
        platelist.innerHTML = plates
          .map((plate, i) => {
            return `
            <li>
                <input type="checkbox" data-index=${i} id="item${i}" ${
              plate.done ? "checked" : " "
            } />
                <label for="item${i}">${plate.text}</label>
            </li>
            `;
          })
          .join("");
      }

      function toggleDone(e) {
        if (!e.target.matches("input")) return; // skip this unless it's an input

        const index = e.target.dataset.index;
        items[index].done = !items[index].done;
        localStorage.setItem("items", JSON.stringify(items));
        console.log(e.target);
      }

      addItems.addEventListener("submit", addItem);
      itemsList.addEventListener("click", toggleDone);
      //Page reload
      populatelist(items, itemsList);

      /*const checkboxes = document.querySelectorAll("input");

      checkboxes.forEach((input) =>
        input.addEventListener("click", () => alert("hi"))
      );*/