const texto = document.querySelector('input')
const btnInsert = document.querySelector('.divInsert button')
const btnDeleteAll = document.querySelector('.header button')
const ul = document.querySelector('ul')

var itensDB = [] //variável global para interação com o banco de dados

//
btnDeleteAll.onclick = () => {
  itensDB = []
  updateDB()
}

//função responsável por adicionar quando pressionada a tecla enter, adiciona li
texto.addEventListener('keypress', e => {
  if (e.key == 'Enter' && texto.value != '') {
    setItemDB()
  }
})
//função responsável para adicionar pelo botão, chama função setItemDB
btnInsert.onclick = () => {
  if (texto.value != '') {
    setItemDB()
  }
}
//adiciona na tela, máximo de 20 linhas com push para listagem e atualiza
function setItemDB() {
  if (itensDB.length >= 20) {
    alert('Limite máximo de 20 itens atingido!')
    return
  }

  itensDB.push({ 'item': texto.value, 'status': '' })
  updateDB()
}
//adiciona o item na listagem, criando todolist
function updateDB() {
  localStorage.setItem('todolist', JSON.stringify(itensDB))
  loadItens()
}
//limpa para não duplicação na tela, para que a lista não seja repetida
function loadItens() {
  ul.innerHTML = "";
  itensDB = JSON.parse(localStorage.getItem('todolist')) ?? []
  itensDB.forEach((item, i) => {
    insertItemTela(item.item, item.status, i)
  })
}
// criação da linha, com as opções de checkbox, com o índice, atribuindo classe para riscar e remover item
function insertItemTela(text, status, i) {
  const li = document.createElement('li')
  
  li.innerHTML = `
    <div class="divLi">
      <input type="checkbox" ${status} data-i=${i} onchange="done(this, ${i});" />
      <span data-si=${i}>${text}</span>
      <button onclick="removeItem(${i})" data-i=${i}><i class='bx bx-trash'></i></button>
    </div>
    `
  ul.appendChild(li)

  if (status) {
    document.querySelector(`[data-si="${i}"]`).classList.add('line-through')
  } else {
    document.querySelector(`[data-si="${i}"]`).classList.remove('line-through')
  }

  texto.value = ''
}
//cria a função de checado
function done(chk, i) {

  if (chk.checked) {
    itensDB[i].status = 'checked' 
  } else {
    itensDB[i].status = '' 
  }

  updateDB()
}
//criando a função de remoção
function removeItem(i) {
  itensDB.splice(i, 1)
  updateDB()
}

loadItens()

