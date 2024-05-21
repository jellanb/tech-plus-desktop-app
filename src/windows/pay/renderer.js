document.getElementById('button-cash').addEventListener('click', ()=> {
    document.getElementById('input-amount').classList.remove('hidden');
    document.getElementById('input-transaction-code').classList.add('hidden');
})

document.getElementById('button-debit-card').addEventListener('click', ()=> {
    document.getElementById('input-amount').classList.add('hidden');
    document.getElementById('input-transaction-code').classList.remove('hidden');
})

document.getElementById('button-credit-card').addEventListener('click', ()=> {
    document.getElementById('input-amount').classList.add('hidden');
    document.getElementById('input-transaction-code').classList.remove('hidden');
})

document.getElementById('button-transfer').addEventListener('click', ()=> {
    document.getElementById('input-amount').classList.add('hidden');
    document.getElementById('input-transaction-code').classList.remove('hidden');
})

document.getElementById('button-close').addEventListener('click', () => {
    window.close()
})