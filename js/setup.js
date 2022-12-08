const isDark = localStorage.getItem('theme') ? localStorage.getItem('theme') === 'dark' : true;
if (isDark) {
	document.body?.classList.add('dark');
}
