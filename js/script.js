'use strict';
// Projects
const repos = [];
const projects = document.querySelector('.projects');

async function getRepos() {
	if (repos.length > 0) return repos;
	const main = await (await fetch('https://api.github.com/users/ZackBarbari/repos?sort=created')).json();
	if (!main) throw new Error('No repos found');
	main.map(r => {
		const newR = {
			name: r.name,
			description: r.description,
			stars: r.stargazers_count,
			date: new Date(r.created_at),
		};
		repos.push(newR);
	});
	const secondary = await (await fetch('https://api.github.com/users/Atrilan/repos?sort=updated')).json();
	if (!secondary) throw new Error('No repos found');
	secondary.map(r => {
		const newR = {
			name: r.name,
			description: r.description,
			stars: r.stargazers_count,
			date: new Date(r.created_at),
		};
		repos.push(newR);
	});
	return repos;
}

const _projects = async () => await getRepos();
_projects().then(data => {
	data.sort((a, b) => b.stars - a.stars).forEach(d => addProject(d));
});

const projectButtons = document.querySelectorAll('.projects .sort button');
projectButtons.forEach(b => {
	b.addEventListener('click', () => {
		console.log(b);
		document.querySelectorAll('.sort li').forEach(l => l.classList.toggle('active'));
		// projects.innerHTML =
		// 	'<nav class="sort"><ul><li class="active"><button>Date</button></li><li><button>Stars</button></li></ul></nav>';
		document.querySelectorAll('.project').forEach(p => p.remove());
		_projects().then(data => {
			if (b.innerText === 'Stars') {
				data.sort((a, b) => b.stars - a.stars).forEach(d => addProject(d));
			} else if (b.innerText === 'Date') {
				data.sort((a, b) => b.date - a.date).forEach(d => addProject(d));
			}
		});
	});
});

function addProject(d) {
	const project = document.createElement('div');
	project.classList.add('project');
	const i = document.createElement('i');
	i.classList.add('fa-regular', 'fa-star');
	project.append(i);
	const div = document.createElement('div');
	project.append(div);
	const h3 = document.createElement('h3');
	h3.textContent = d.name;
	const span = document.createElement('span');
	span.textContent = d.stars;
	h3.append(span);
	const p = document.createElement('p');
	p.textContent = d.description;
	div.append(h3, p);
	projects.append(project);
}

// Blogs

const blogs = document.querySelector('.main-blogs');
const _blogs = async () => await (await fetch('./data/blogs.json')).json();
_blogs().then(data => {
	if (data.length === 0) {
		blogs.innerHTML = '<h2>No blogs found</h2>';
		return;
	}
	const years = [...new Set(data.map(d => d.date.split('-')[0]))].sort((a, b) => b - a);
	years.forEach(y => {
		const year = addYear(y);
		data
			.filter(d => d.date.split('-')[0] === y)
			.sort((a, b) => new Date(b.date.replace(/-/g, '/')) - new Date(a.date.replace(/-/g, '/')))
			.forEach(d => addBlog(year, d));
	});
});

const blogButtons = document.querySelectorAll('.main-blogs .sort button');
blogButtons.forEach(b => {
	b.addEventListener('click', () => {
		document.querySelectorAll('.sort li').forEach(l => l.classList.toggle('active'));
		document.querySelectorAll('.blog-year').forEach(p => p.remove());
		_blogs().then(data => {
			if (b.innerText === 'Ascend') {
				const years = [...new Set(data.map(d => d.date.split('-')[0]))].sort((a, b) => a - b);
				years.forEach(y => {
					const year = addYear(y);
					data
						.filter(d => d.date.split('-')[0] === y)
						.sort((a, b) => new Date(a.date.replace(/-/g, '/')) - new Date(b.date.replace(/-/g, '/')))
						.forEach(d => addBlog(year, d));
				});
			} else if (b.innerText === 'Descend') {
				const years = [...new Set(data.map(d => d.date.split('-')[0]))].sort((a, b) => b - a);
				years.forEach(y => {
					const year = addYear(y);
					data
						.filter(d => d.date.split('-')[0] === y)
						.sort((a, b) => new Date(b.date.replace(/-/g, '/')) - new Date(a.date.replace(/-/g, '/')))
						.forEach(d => addBlog(year, d));
				});
			}
		});
	});
});

function addYear(y) {
	const year = document.createElement('div');
	year.classList.add('blog-year');
	blogs.append(year);
	const h2 = document.createElement('h2');
	h2.textContent = y;
	year.append(h2);
	const _blogs = document.createElement('div');
	_blogs.classList.add('blogs');
	year.append(_blogs);
	return _blogs;
}

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function addBlog(year, d) {
	const div = document.createElement('div');
	div.classList.add('blog');
	const h3 = document.createElement('h3');
	h3.innerText = d.name;
	div.append(h3);
	const p = document.createElement('p');
	const date = new Date(d.date.replace(/-/g, '/'));
	p.innerText = `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
	div.append(p);
	year.append(div);
}

// Theme
const theme = document.querySelector('#mode');
localStorage.getItem('theme') === 'dark' ? document.body.classList.add('dark') : document.body.classList.remove('dark');
theme.addEventListener('click', () => {
	document.body.classList.toggle('dark');
	localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
});
