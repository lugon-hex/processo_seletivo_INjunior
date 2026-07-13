/*--------------------CONFIGURANDO BOTOES------------------------------*/

const mainAddButton = document.getElementById("main-add")
const addModal = document.getElementById("add-modal");

mainAddButton.addEventListener ("click" ,() => {
    addModal.showModal();
});

const mainEditButton = document.getElementById("main-edit");
const editModal = document.getElementById("edit-modal");

mainEditButton.addEventListener("click", () => {
    editModal.showModal();
});

const exitBtns = document.querySelectorAll(".exit-btn");

exitBtns.forEach(btn => {
    btn.addEventListener("click", () => {

        const supModal = btn.closest("dialog");

        if(supModal) {
            supModal.close();
        }
    })
});


function closeRespectiveDialog(btn) {

    const supModal = btn.closest("dialog");
    if(supModal){
        supModal.close()
    }   
}


const HtmlMain = document.querySelector("main");
const hidingButtons = document.querySelectorAll(".hides-main");
const showingButtons = document.querySelectorAll(".shows-main");

hidingButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        HtmlMain.classList.add("hidden");
    })
});

showingButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        HtmlMain.classList.remove("hidden");
    })
});

/*----------------------------------CONFIGURANDO LISTA---------------------------*/

const formLista = document.getElementById("market-form");
const mainList = document.getElementById("main-list");
const editList = document.getElementById("edit-list");

const shoppingList = new Map();

/* adicionando elementos */
formLista.addEventListener('submit', (e) => {
    e.preventDefault();

    const formListaData = new FormData(formLista);
    const marketItem = Object.fromEntries(formListaData);

    marketItem.name = marketItem.name.trim();
    
    if(!shoppingList.has(marketItem.name)){
		addLists(marketItem);
	} else {
		const aux = shoppingList.get(marketItem.name);
		
		aux.qty = marketItem.qty;

		aux.mainElement.querySelector("span").textContent = marketItem.qty;
		aux.editElement.querySelector("span").textContent = marketItem.qty;
	}

    updateHeader();

    renderizeScreen();

    formLista.reset();

    closeRespectiveDialog(formLista);

    HtmlMain.classList.remove("hidden");
})

function updateHeader(){
    const headerCounter = document.getElementById("total-itens");
    headerCounter.textContent = shoppingList.size + " itens";
}

function renderizeScreen() {
    const zeroState = document.getElementById("zero-state");
    if(shoppingList.size > 0){
        mainList.classList.remove("hidden");
        zeroState.classList.add("hidden");
    } else {
        mainList.classList.add("hidden");
        zeroState.classList.remove("hidden");
    }
}

function addLists(marketItem) {
    const editLi = addEditList(marketItem);
	const mainLi = addMainList(marketItem);

	shoppingList.set(marketItem.name, {
		qty: marketItem.qty,
		editElement: editLi,
		mainElement: mainLi
	});
}

function addEditList(marketItem) {
    const li = document.createElement("li");
    const p = document.createElement("p");

    const div = document.createElement("div");
    const span = document.createElement("span");
    const img = document.createElement("img");

    const button = document.createElement("button");

    p.textContent = marketItem.name;
    span.textContent = marketItem.qty;

    img.src = "assets/icons8-trash-50.png";
    img.alt = "Remover item";

    button.classList.add("remove-btn");

    button.append(img);
    div.append(span, button);
    li.append(p, div);

    editList.append(li);

    return li;
}

function addMainList(marketItem) {
    const li = document.createElement("li");
    const p = document.createElement("p");
    const span = document.createElement("span");

    p.textContent = marketItem.name;
    span.textContent = marketItem.qty;

    li.append(p, span);
    mainList.append(li);

    return li;
}

mainEditButton.addEventListener("click", () => {
	const removeBtns = document.querySelectorAll(".remove-btn");
	removeBtns.forEach(btn => {
		btn.addEventListener("click", () => {
        
			const li = btn.closest("li");
			if (!li) return;
        	const p = li.querySelector("p");

			const item = shoppingList.get(p.textContent);

			if (item) {
				item.mainElement.remove();  
				item.editElement.remove();
				shoppingList.delete(p.textContent);
			}

			updateHeader();
			renderizeScreen();
		});
	});
});
