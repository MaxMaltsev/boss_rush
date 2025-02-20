const infoElement = document.getElementById('info');
var xpos = 500;
var ypos = 300;
infoElement.style.top = ypos + "px";
infoElement.style.left = xpos + "px";
infoElement.innerHTML = "<img src=\'player.png\' width=\'150px\' height=\'150px\'>";
const enemyElement = document.getElementById('enemy');
enemyElement.style.top = yEnemy + "px";
enemyElement.style.left = xEnemy + "px";
enemyElement.innerHTML = "<img src=\'player.png\' width=\'200px\' height=\'300px\'>";
const slashElement = document.getElementById('playerSlash');
slashElement.style.top = ypos + "px";
slashElement.style.left = xpos + "px";
const staminaElement = document.getElementById('staminaBar');
const healthElement = document.getElementById('healthBar');
const enemySlash = document.getElementById('enemySlash');
const playerParry = document.getElementById('playerParry');
const shockwaveElement = document.getElementById('shockwave');
const playerHitbox = infoElement.getBoundingClientRect();
const shockwaveHitbox = shockwaveElement.getBoundingClientRect();
const enemyHealthBar = document.getElementById('enemyHealthBar');
const playerHeavy = document.getElementById('playerHeavy');
const heavyCooldownBar = document.getElementById('heavyCooldownBar');
const winMessage = document.getElementById('winMessage');
winMessage.style.display = "none";
let height = window.innerHeight - 180;
let width = window.innerWidth - 100;
var shockwaveTime = 0;
var upPressed = false;
var leftPressed = false;
var downPressed = false;
var rightPressed = false;
var spacePressed = false;
var parrying = false;
var fpressed = false;
var xvel = 0;
var yvel = 0;
var yEnemy = 300;
var xEnemy = 800;
var yEnemyVel = 0;
var xEnemyVel = 0;
var stamina = 600;
var health = 900;
var stun = 0;
var posture = 50;
var enemyAttacking = false;
var attacknum = 0;
var shockwaveSize = 0;
var enemyHp = 1000;
var epressed = false;
var usingHeavy = false;
var heavyCooldown = 0;
var enemyHitHeavy = false;
var facingDirection = 0;
document.addEventListener('keydown', (event) => {
    if (event.key === 'w') {
        upPressed = true;
    } else if (event.key === 's') {
        downPressed = true;
    } else if (event.key === 'a') {
        leftPressed = true;
    } else if (event.key === 'd') {
        rightPressed = true;
    } else if (event.key === ' ') {
        spacePressed = true;
    } else if (event.key === 'f') {
        fpressed = true;
    } else if (event.key === 'e') {
        epressed = true;
    }
});
document.addEventListener('keyup', (event) => {
    if (event.key === 'w') {
        upPressed = false;
    } else if (event.key === 's') {
        downPressed = false;
    } else if (event.key === 'a') {
        leftPressed = false;
    } else if (event.key === 'd') {
        rightPressed = false;
    } else if (event.key === ' ') {
        spacePressed = false;
    } else if (event.key === 'f') {
        fpressed = false;
    } else if (event.key === 'e') {
        epressed = false;
    }
});
slashElement.addEventListener('animationend', () => {
    slashElement.style.animationPlayState = "paused";
    slashElement.style.animation = 'none';
    slashElement.offsetHeight;
    slashElement.style.animation = '';
});
playerHeavy.addEventListener('animationend', () => {
    playerHeavy.style.animationPlayState = "paused";
    playerHeavy.style.animation = 'none';
    playerHeavy.offsetHeight;
    playerHeavy.style.animation = '';
    usingHeavy = false;
});
enemySlash.addEventListener('animationend', () => {
    enemySlash.style.animationPlayState = "paused";
    enemySlash.style.animation = 'none';
    enemySlash.offsetHeight;
    enemySlash.style.animation = '';
    if (xpos - 150 < xEnemy && xEnemy < xpos + 150 && ypos - 200 < yEnemy && yEnemy < ypos + 100) {
        if (parrying == false) {
            health -= 100;
            if (xEnemy < xpos) {
                xvel += 25;
                yvel -= 5;
                xEnemyVel -= 10;
            } else {
                xvel -= 25
                yvel -= 5;
                xEnemyVel += 10;
            }
        } else {
            posture -= 10;
            for (i = 0; i < 5; i++) {
                blockParticle();
            }
            if (xEnemy < xpos) {
                xvel -= 5;
                yvel -= 2;
                xEnemyVel -= 15;
            } else {
                xvel += 5
                yvel -= 2;
                xEnemyVel += 15;
            }
        }
    }
});
playerParry.addEventListener('animationend', () => {
    playerParry.style.animationPlayState = "paused";
    playerParry.style.animation = 'none';
    playerParry.offsetHeight;
    playerParry.style.animation = '';
    parrying = false;
    fpressed = false;
});

function handleTick() {
    movePlayer();
    manageSlash();
    moveEnemy();
    manageStats();
    manageSplats();
    manageSparks();
}

function splat() {
    var splatSize = 2 * Math.random() + 1;
    var bloodElement = document.createElement("div");
    bloodElement.classList.add('splat');
    bloodElement.creationTime = Date.now();
    document.body.appendChild(bloodElement);
    bloodElement.innerHTML = "<img src=\'Blood-splatter.png\' width=\'128px\' height=\'128px\'>";
    bloodElement.style.position = "absolute";
    bloodElement.style.top = yEnemy + (200 * Math.random()) + "px";
    bloodElement.style.left = xEnemy - 100 + (200 * Math.random()) + "px";
    bloodElement.style.transform = "rotate(" + (360 * Math.random()) + "deg) scale(" + splatSize + "," + splatSize + ")";
}
function blockParticle() {
    var sparkSize = Math.random() + 1;
    var sparkElement = document.createElement("div");
    var sparkElement2 = document.createElement("div");
    sparkElement.classList.add('spark');
    sparkElement.creationTime = Date.now();
    sparkElement.angle = 360 * Math.random();
    document.body.appendChild(sparkElement);
    sparkElement.innerHTML = "<img src=\'parry2.png\' width=\'64px\' height=\'64px\'>";
    sparkElement.style.position = "absolute";
    sparkElement.style.top = parseInt(slashElement.style.top) + "px";
    if (xpos < xEnemy) {
        sparkElement.style.left = parseInt(enemyElement.style.left) - 30 + "px";
    } else {
        sparkElement.style.left = parseInt(enemyElement.style.left) + 50 + "px";
    }
    sparkElement.style.transform = "rotate(" + (360 * Math.random()) + "deg) scale(" + sparkSize + "," + sparkSize + ")";
}

function manageSplats() {
    var splats = document.getElementsByClassName("splat");
    const SPLAT_LIFETIME = 2000;
    const time = Date.now();
    for (const splat of splats) {
        const sinceCreation = time - splat.creationTime;
        if (sinceCreation > SPLAT_LIFETIME) {
            splat.remove();
        } else {
            splat.style.opacity = (SPLAT_LIFETIME - sinceCreation) / SPLAT_LIFETIME;
        }
    }
}
function manageSparks() {
    var sparks = document.getElementsByClassName("spark");
    const SPARK_LIFETIME = 400;
    const time = Date.now();
    for (const spark of sparks) {
        const sinceCreation = time - spark.creationTime;
        if (sinceCreation > SPARK_LIFETIME) {
            spark.remove();
        } else {
            spark.style.opacity = (SPARK_LIFETIME - sinceCreation) / SPARK_LIFETIME;
            spark.style.left = parseInt(spark.style.left) + 50 * (Math.cos(spark.angle)) / (sinceCreation / 20 + 1) + "px";
            spark.style.top = parseInt(spark.style.top) + 50 * (Math.sin(spark.angle)) / (sinceCreation / 20 + 1) + "px";
        }
    }
}

function movePlayer() {
    if (upPressed && ypos == height) {
        yvel = -20;
    }
    if (upPressed && xpos == -50) {
        xvel = 20;
        yvel = -30;
    }
    if (upPressed && xpos == width) {
        xvel = -20;
        yvel = -30;
    }
    if (leftPressed) {
        xvel -= 2;
    }
    if (downPressed) {
        yvel += 2;
    }
    if (rightPressed) {
        xvel += 2;
    }
    if (fpressed && stamina > 100 && parrying != true) {
        parrying = true;
        playerParry.style.animationPlayState = "running";
        stamina -= 100;
    }
    xpos += xvel;
    ypos += yvel;
    xvel *= 0.85
    yvel *= 0.98
    infoElement.style.top = (ypos) + "px";
    infoElement.style.left = (xpos) + "px";
    slashElement.style.top = (ypos) + "px";
    if (ypos != height) {
        yvel += 1.2
    }
    if (ypos > height) {
        yvel = 0;
        ypos = height;
    }
    if (xpos < -50) {
        xvel = 0;
        xpos = -50;
    }
    if (ypos < -50) {
        yvel *= -0.5;
        ypos = -50;
    }
    if (xpos > width) {
        xvel = 0;
        xpos = width;
    }
    if (xvel > 0) {
        infoElement.style.transform = "scaleX(-1)";
    } else {
        infoElement.style.transform = "scaleX(1)";
    }
}

function manageSlash() {
    if (usingHeavy != true) {
        enemyHitHeavy = false;
    }
    playerHeavy.style.top = ypos - 200 + "px";
    if (epressed == true && playerHeavy.style.animationPlayState != "running" && heavyCooldown < 1) {
        playerHeavy.style.animationPlayState = "running";
        usingHeavy = true;
        xvel = 3 * xvel;
        yvel = 3 * yvel;
        heavyCooldown += 100;
    }
    if (shockwaveTime <= 0) {
        shockwaveElement.style.top = (yEnemy + 250) + "px";
        shockwaveElement.style.display = "none";
    }
    playerParry.style.top = (ypos - 15) + "px";
    playerParry.style.left = (xpos - 30) + "px";
    if (stamina < 600) {
        stamina += 3;
    }
    if (stamina > 600) {
        stamina = 600;
    }
    staminaElement.style.width = stamina + "px";
    if (xvel > 0) {
        if (usingHeavy == true) {
            xvel += 5;
            if (xpos - 50 < xEnemy && xEnemy < xpos + 50 && ypos - 100 < yEnemy < ypos + 50) {
                if (enemyHitHeavy == false) {
                    if (stun > 0) {
                        enemyHitHeavy = true;
                        for (i = 0; i < 6; i++) {
                            splat();
                        }
                        enemyHp -= 100;
                        xEnemyVel += 120;
                        yEnemyVel -= 10;
                    } else {
                        enemyHitHeavy = true;
                        for (i = 0; i < 6; i++) {
                            blockParticle();
                        }
                        posture -= 20;
                        enemyHp -= 10;
                        xEnemyVel += 12;
                        yEnemyVel -= 3;
                    }
                }
            }
        }
        playerHeavy.style.left = xpos + "px";
        slashElement.style.left = (xpos + 40) + "px";
        slashElement.style.transform = "scaleX(-1)";
        playerHeavy.style.transform = "scale(-1, -1)";
    } else {
        if (usingHeavy == true) {
            xvel -= 5;
            if (xpos - 50 < xEnemy && xEnemy < xpos + 50 && ypos - 100 < yEnemy < ypos + 50) {
                if (enemyHitHeavy == false) {
                    if (stun > 0) {
                        enemyHitHeavy = true;
                        for (i = 0; i < 6; i++) {
                            splat();
                        }
                        enemyHp -= 100;
                        xEnemyVel -= 120;
                        yEnemyVel -= 10;
                    } else {
                        enemyHitHeavy = true;
                        for (i = 0; i < 6; i++) {
                            blockParticle();
                        }
                        posture -= 20;
                        enemyHp -= 10;
                        xEnemyVel -= 12;
                        yEnemyVel -= 3;
                    }
                }
            }
        }
        playerHeavy.style.left = xpos - 80 + "px";
        slashElement.style.left = (xpos - 20) + "px";
        slashElement.style.transform = "scaleX(1)";
        playerHeavy.style.transform = "scale(1, -1)";
    }
    if (spacePressed && slashElement.style.animationPlayState != "running" && stamina >= 100) {
        stamina -= 100;
        for (let i = 0; i < 3; i++) {
            slashElement.style.animationPlayState = "running";
            if (stamina < 600) {
                stamina += 3;
            }
            if (stamina > 600) {
                stamina = 600;
            }

            staminaElement.style.width = stamina + "px";
            if (xvel > 0) {
                slashElement.style.left = (xpos + 40) + "px";
                slashElement.style.transform = "scaleX(-1)";
                facingDirection = 1;
            } else {
                slashElement.style.left = (xpos - 20) + "px";
                slashElement.style.transform = "scaleX(1)";
                facingDirection = -1;
            }
            var leftDelta = 125 - 75 * facingDirection;
            var rightDelta = 125 + 75 * facingDirection;
            if (xpos - leftDelta < xEnemy && xpos + rightDelta > xEnemy
                && ypos - 200 < yEnemy && ypos + 100 > yEnemy) {
                if (stun > 0) {
                    yEnemyVel -= 1;
                    yvel -= 0.1;
                    xEnemyVel += facingDirection;
                    splat();
                    enemyHp -= 10;
                } else {
                    blockParticle();
                    yEnemyVel -= 0.1*facingDirection;
                    yvel -= 1;
                    xvel -= 1;
                }
            }
        }
    }
}

function moveEnemy() {
    yEnemy += yEnemyVel;
    xEnemy += xEnemyVel;
    xEnemyVel *= 0.90;
    yEnemyVel *= 0.98;
    enemyElement.style.top = (yEnemy) + "px";
    enemyElement.style.left = (xEnemy) + "px";
    yEnemyVel += 1;
    if (yEnemyVel >= 30 && yEnemy > height - 150) {
        yEnemyVel = 0;
        shockwaveTime += 10;
    }
    if (yEnemy > height - 150) {
        yEnemy = height - 150;
        yEnemyVel = 0;
    }
    if (yEnemy < 200 && yEnemyVel >= 0) {
        yEnemyVel = 30;
    }
    if (stun <= 0) {
        if (xpos - 150 > xEnemy) {
            if (shockwaveTime <= 0) {
                shockwaveElement.style.left = (xEnemy - 100) + "px";
            }
            xEnemyVel += 1;
            enemyElement.style.transform = "scaleX(-1)";
            enemySlash.style.transform = "scaleX(-1)";
        } else if (xpos + 150 < xEnemy) {
            if (shockwaveTime <= 0) {
                shockwaveElement.style.left = (xEnemy - 40) + "px";
            }
            xEnemyVel -= 1;
            enemyElement.style.transform = "scaleX(1)";
            enemySlash.style.transform = "scaleX(1)";
        }
    }
    enemySlash.style.top = (yEnemy) + "px";
    if (xpos > xEnemy) {
        enemySlash.style.left = (xEnemy + 20) + "px";
    } else {
        enemySlash.style.left = (xEnemy - 40) + "px";
    }

}

function manageStats() {
    if (health <= 0) {
        location.reload();
    }
    if (enemyHp < 0) {
        enemyElement.remove();
        yEnemy = -1000;
        winMessage.style.display = "block";
    }
    heavyCooldownBar.style.width = heavyCooldown + "px";
    if (heavyCooldown > 0) {
        heavyCooldown -= 1;
    }
    var shockwaveEdgeLeft = parseInt(shockwaveElement.style.left, 10) - (64 * shockwaveSize);
    var shockwaveEdgeRight = parseInt(shockwaveElement.style.left, 10) + (64 * shockwaveSize)
    shockwaveSize = 25 - shockwaveTime;
    attacknum = Math.floor(10 * Math.random() + 1);
    if (enemyElement.style.transform == "scaleX(-1)") {
        enemyHealthBar.style.left = xEnemy - (enemyHp / 10) + 85 + "px";
    } else {
        enemyHealthBar.style.left = xEnemy - (enemyHp / 10) + 125 + "px";
    }
    if (shockwaveTime > 0) {
        if (shockwaveEdgeLeft < xpos && shockwaveEdgeRight > xpos) {
            if (ypos > (height - 50) && parrying != true) {
                yvel -= 20;
                health -= 100;
            }
        }
        shockwaveElement.style.opacity = (shockwaveTime / 25) + "";
        shockwaveElement.style.display = "block";
        shockwaveElement.style.transform = "scaleX(" + (shockwaveSize / 2) + ")";
        shockwaveTime -= 1;
    }
    if (stun == 1) {
        posture = 50;
    }
    if (stun < 0) {
        stun = 0;
    }
    if (posture <= 0 && posture != -1) {
        stun = 100;
        posture = -1;
    }
    healthElement.style.width = health + "px";
    stun -= 1;
    enemyHealthBar.style.width = (enemyHp / 10) + "px";
    enemyHealthBar.style.top = yEnemy + "px";
    if (stun < 0) {
        stun = 0;
    }
    if (health < 900) {
        health += 0.5;
    }
    if (health > 900) {
        health = 900;
    }
    if (health < 0) {
        health = 0;
    }
    staminaElement.style.width = stamina + "px";
    if (xpos - 160 < xEnemy && xEnemy < xpos + 160 && ypos - 200 < yEnemy && yEnemy < ypos + 100 && stun <= 0 && enemySlash.style.animationPlayState != "running" && shockwaveTime <= 0) {
        if (attacknum < 9) {
            enemySlash.style.animationPlayState = "running";
        } else if (shockwaveTime <= 0) {
            yEnemyVel -= 30;
        }
    }
}

let intervalId = setInterval(() => handleTick(), 30);
