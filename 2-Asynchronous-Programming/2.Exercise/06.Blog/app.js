function attachEvents() {
    document.getElementById('btnLoadPosts').addEventListener('click', getAllPosts);
    document.getElementById('btnViewPost').addEventListener('click', displayPosts);
}

attachEvents();

async function displayPosts() {
    let titleEl = document.getElementById('post-title');
    let bodyEl = document.getElementById('post-body');
    let commentsEl = document.getElementById('post-comments');

    titleEl.textContent = 'Loading...';
    bodyEl.textContent = '';
    commentsEl.replaceChildren();

    let selectedId = document.getElementById('posts').value;

    let [post, comments] = await Promise.all([
        getPostById(selectedId),
        getCommentsByPostId(selectedId)
    ]);

    titleEl.textContent = post.title;
    bodyEl.textContent = post.body;

    comments.forEach(el => {
        let liEl = document.createElement('li');
        liEl.textContent = el.text;
        commentsEl.appendChild(liEl);
    });
}

async function getAllPosts() {
    let url = 'http://localhost:3030/jsonstore/blog/posts';

    let res = await fetch(url);
    let data = await res.json();

    let selectEl = document.getElementById('posts');
    selectEl.replaceChildren();

    Object.values(data).forEach(el => {
        let optionEl = document.createElement('option');
        optionEl.textContent = el.title;
        optionEl.value = el.id;

        selectEl.appendChild(optionEl);
    });
}

async function getPostById(postId) {
    let url = 'http://localhost:3030/jsonstore/blog/posts/' + postId;

    let res = await fetch(url);
    let data = await res.json();

    return data;
}

async function getCommentsByPostId(postId) {
    let url = 'http://localhost:3030/jsonstore/blog/comments';

    let res = await fetch(url);
    let data = await res.json();

    let comments = Object.values(data).filter(c => c.postId === postId);

    return comments;
}