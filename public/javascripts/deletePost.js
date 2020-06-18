async function deletePost(){
    try {
        let link = document.getElementsByClassName('delete')[0].getAttribute('data-link');
        let res = await fetch(link);
        res = await res.json();
        if(res.msg!="error") return window.location.replace('/tutorials/somestufftoreloadthepage');
    }
    catch (e) {
        console.log(e);
    }
}