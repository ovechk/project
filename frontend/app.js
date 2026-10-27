fetch('/api/items')
	.then(r => r.json())
	.then(items => {
		const ul = document.getElementById('list');
		ul.innerHTML = '';
		if (items.length === 0) {
			ul.textContent = 'Пусто';
			return;
		}
		items.forEach(it => {
			const li = document.createElement('li');
			li.textContent = `#${it.id} — ${it.name}`;
			ul.appendChild(li);
		});
	})
	.catch(err => {
		document.getElementById('list').textContent = 'Ошибка: ' + err;
	});