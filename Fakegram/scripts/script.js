function render() {
    renderLeftNav();
    renderRightNav();
    renderStories();
    renderPosts();
}

function returnHTML(num, i, post, profile) {
    if (num == 1) {
        return /* html */`
        <div id="myProfile" class="profiles">
            <img id="profil-images" src="${profiles[0]['image']}" alt="${profiles[0][' username']}">
            <div class="name-div">
                <h3>${profiles[0]['username']}</h3>
            </div>
            <span><b>Wechseln</b></span>
        </div>
    `;
    } else if (num == 2) {
        return /* html */`
        <div class="profiles">
            <img src="${profile['image']}" alt="Profilepicture">
            <div class="name-div">
                <div id="verified-div${i}" class="verified-div">
                <h3>${profile['username']}</h3>
                </div>
                <p>${profile['suggestion']}</p>
            </div>
            <span><b>Folgen</b></span>
        </div>
    `;
    } else if (num == 3) {
        return /* html */`
        <div id="post">
            <div id="post-info" class="post-info">
                <img id="post-pp" src="${post['profileImage']}" alt="Profilepicture">
                <h3>${post['username']}</h3>
                <p>•</p>
                <p>${post['age']}</p>
                <svg height="24" role="img" width="24">
                    <circle cx="12" cy="12" r="1.5"></circle>
                    <circle cx="6" cy="12" r="1.5"></circle>
                    <circle cx="18" cy="12" r="1.5"></circle>
                </svg>
            </div>
            <img id="post-image" ondblclick="like(${i})" class="post" src="${post['image']}" alt="Post">
            <div class="engagement">
                <div id="buttons" class="buttons">
                    <div class="like-com-share">
                        <img id="like-red${i}" onclick="notLike(${i})" class="like d-none red-like" src="./img/Like-Red.svg" alt="Liked">
                        <img id="like${i}" onclick="like(${i})" class="like" src="./img/Like.svg" alt="Like">
                        <img href="#comment" src="./img/Comment.svg" alt="Comment">
                        <img src="./img/Messages.svg" alt="Share">
                    </div>
                    <img src="./img/Bookmark.svg" alt="Save">
                </div>
                <div id="like-count${i}">
                <h3 class="likes">Gefällt ${post['likes'].toLocaleString()} Mal</h3>
                </div>
                <h3 id="caption${i}" class="caption"><b>faktastisch</b> ${post['caption']}</h3>
                <h3 id="show-caption${i}" class="caption comments" onclick="showCaption(${i})">mehr</h3>
                <h3 id="commentCount${i}" class="caption comments"></h3>
                <div id="comment-box${i}" class="comment-box">
                
                </div>
                <div class="comment">
                    <input oninput="showPostButton(${i})" id="comment${i}" class="input" type="text" placeholder="Kommentieren ...">
                    <h3 id="post-button${i}" class="post-button d-none" onclick="postComment(${i})">Posten</h3>
                    <img src="./img/icons8-glücklich-90.png" alt="Emojis">
                </div>
            </div>
        </div>
    `;
    }
}


function renderLeftNav() {
    let container = document.getElementById('profile-render');

    container.innerHTML = /* html */`
            <img id="profile" src="${profiles[0]['image']}" alt="Profil">
            <p>Profil</p>
    `;
}


function renderRightNav() {
    let container1 = document.getElementById('suggestions');
    let container2 = document.getElementById('right-nav');


    container1.insertAdjacentHTML("beforebegin", returnHTML(1));


    container2.innerHTML = '';

    for (let i = 1; i < 6; i++) {
        const profile = profiles[i];

        container2.innerHTML += returnHTML(2, i, 0, profile);

        if (profile['verfied'] == true) {
            document.getElementById(`verified-div${i}`).innerHTML += /*html */`
            <img src="./img/verified.svg" alt="Verified">
            `;
        };
    };
}


function renderStories() {
    let container = document.getElementById('stories');

    container.innerHTML = '';

    for (let i = 6; i < 14; i++) {
        const profile = profiles[i];

        container.innerHTML += /* html */`
            <div class="story">
                <img src="${profile['image']}" alt="Profilepicture">
                <p>${profile['username']}</p>
            </div>
        `;
    };
}


function renderPosts() {
    let container = document.getElementById('feed');

    container.innerHTML = '';

    for (let i = 0; i < posts.length; i++) {
        const post = posts[i];

        container.innerHTML += returnHTML(3, i, post);
        loadLikes(i);
        loadComments(i);
    };
}

function loadLikeCount(i) {
    let likeCount = document.getElementById(`like-count${i}`);

    likeCount.innerHTML = /* html */`
    <h3 class="likes">Gefällt ${posts[i]['likes'].toLocaleString()} Mal</h3>
    `
}


function like(i) {
    document.getElementById(`like${i}`).classList.add('d-none');
    document.getElementById(`like-red${i}`).classList.remove('d-none');

    if (posts[i]['liked'] === false) {
        posts[i]['liked'] = true;
        posts[i]['likes']++;
    }

    saveLike(i);
    loadLikeCount(i);
}


function notLike(i) {
    document.getElementById(`like${i}`).classList.remove('d-none');
    document.getElementById(`like-red${i}`).classList.add('d-none');

    posts[i]['liked'] = false;
    posts[i]['likes']--;

    saveLike(i);
    loadLikeCount(i);
}


function darkmode() {
    let leftNav = document.getElementById('left-nav');
    let feedOptionB = document.querySelector('.feed-option b');
    let feedOption = document.querySelector('.feed-option');
    let buttons = document.querySelectorAll('#buttons');

    document.body.classList.toggle('darkmode-main');
    leftNav.classList.toggle('darkmode-buttons');
    leftNav.classList.toggle('darkmode-border');
    leftNav.classList.toggle('darkmode-main')
    feedOptionB.classList.toggle('darkmode-main');
    feedOption.classList.toggle('darkmode-main');
    feedOption.classList.toggle('darkmode-border');
    feedOption.classList.toggle('darkmode-buttons');
    document.getElementById('searchbar').classList.toggle('darkmode-searchbar');
    document.getElementById('feed').classList.toggle('darkmode-border');
    document.getElementById('stories').classList.toggle('ring-dark');
    document.getElementById('profile').classList.toggle('darkmode-shadow');
    document.getElementById('right-nav').classList.toggle('darkmode-profile');
    document.getElementById('myProfile').classList.toggle('darkmode-profile');
    document.getElementById('pages-div').classList.toggle('pages-dark-div');
    document.getElementById('switch-div').classList.toggle('pages-dark-hover');
    document.getElementById('more-div').classList.toggle('pages-dark-hover');

    buttons.forEach((button) => {
        button.classList.toggle('darkmode-buttons');
    });

    buttons.forEach((button) => {
        button.classList.toggle('buttons-dark');
    });

    document.querySelectorAll('#post-info').forEach((postInfo) => {
        postInfo.classList.toggle('darkmode-buttons');
    });

    document.querySelectorAll('.input').forEach((input) => {
        input.classList.toggle('darkmode-main');
    });

    document.querySelectorAll('#post-image').forEach((postImage) => {
        postImage.classList.toggle('darkmode-shadow');
    });

    document.querySelectorAll('.comment').forEach((comment) => {
        comment.classList.toggle('darkmode-border');
    });
}


function showCaption(i) {
    document.getElementById(`show-caption${i}`).classList.toggle('d-none');
    document.getElementById(`caption${i}`).classList.toggle('show-full');
}


function loadComments(index) {
    let commentAuthorsAsText = localStorage.getItem(`commentAuthors${index}`);
    let commentTextsAsText = localStorage.getItem(`commentTexts${index}`);
    let commentCountAsText = localStorage.getItem(`commentCount${index}`);
    if (commentAuthorsAsText && commentTextsAsText && commentCountAsText) {
        let commentAuthors = JSON.parse(commentAuthorsAsText);
        let commentTexts = JSON.parse(commentTextsAsText);
        let commentCount = JSON.parse(commentCountAsText);

        posts[index]['commentAuthors'] = commentAuthors;
        posts[index]['commentTexts'] = commentTexts;
        posts[index]['commentCount'] = commentCount;

    }

    let commentAuthors = posts[index]['commentAuthors'];
    let commentBox = document.getElementById(`comment-box${index}`);
    let commentCount = document.getElementById(`commentCount${index}`);

    commentBox.innerHTML = '';

    for (let i = 0; i < commentAuthors.length; i++) {

        commentBox.innerHTML += /* html */ `
        <div>
            <b>${posts[`${index}`]['commentAuthors'][`${i}`]}</b> ${posts[`${index}`]['commentTexts'][`${i}`]}
        </div>
        `;
    };
    commentCount.innerHTML = `Alle ${posts[index]['commentCount']} Kommentare ansehen`
}


function showPostButton(i) {
    let input = document.getElementById(`comment${i}`);
    let postButton = document.getElementById(`post-button${i}`)

    if (input.value.length > 0) {
        postButton.classList.remove('d-none');
    } else {
        postButton.classList.add('d-none');
    }
};


function postComment(i) {
    let comment = document.getElementById(`comment${i}`);
    let author = posts[i]['commentAuthors'];
    let text = posts[i]['commentTexts']

    if (comment.value) {
        author[author.length] = 'mvstafa34';
        text[text.length] = comment.value;

        posts[i]['commentCount'] += 1;
        saveComment(i);
        comment.value = '';

        loadComments(i);
    };
}


function saveLike(i) {
    let likedBoolean = posts[i]['liked'];
    let likeCount = posts[i]['likes'];

    let likedBooleanAsText = JSON.stringify(likedBoolean);
    localStorage.setItem(`likedBoolean${i}`, likedBooleanAsText);

    let likeCountAsText = JSON.stringify(likeCount);
    localStorage.setItem(`likeCount${i}`, likeCountAsText);
}

function saveComment(i) {
    let post = posts[i];

    let commentAuthors = post['commentAuthors']
    let commentTexts = post['commentTexts']
    let commentCount = post['commentCount'];

    let commentAuthorsAsText = JSON.stringify(commentAuthors);
    localStorage.setItem(`commentAuthors${i}`, commentAuthorsAsText);

    let commentTextsAsText = JSON.stringify(commentTexts);
    localStorage.setItem(`commentTexts${i}`, commentTextsAsText);

    let commentCountAsText = JSON.stringify(commentCount);
    localStorage.setItem(`commentCount${i}`, commentCountAsText);
}


function loadLikes(i) {
    let likedBooleanAsText = localStorage.getItem(`likedBoolean${i}`);
    let likeCountAsText = localStorage.getItem(`likeCount${i}`);

    if (likedBooleanAsText && likeCountAsText) {
        let likedBoolean = JSON.parse(likedBooleanAsText);
        let likeCount = JSON.parse(likeCountAsText);

        posts[i]['liked'] = likedBoolean;
        posts[i]['likes'] = likeCount;

        if (likedBoolean == true) {
            like(i);
        };
    };
}