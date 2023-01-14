const body = document.querySelector("body");
function makeSnowflake(){
    const snowflake = document.createElement("div");
    snowflake.classList.add("snowflake");
    snowflake.style.left = `${Math.random() *window.screen.width}px`;
    body.appendChild(snowflake);
}
for (let index=  0; index<50;index++){
    makeSnowflake();
}