let sortingType = 'insertion';
const sortingBox = document.querySelector('#sorting_box');
const interval = 1;

addNodes(50);

function setSortingType(type) {
    sortingType = type;
}

function addNodes(value) {
    sortingBox.innerHTML = '';
    // let heights = [100, 150, 120, 180, 220];
    document.querySelector('button').hidden = false;
    for (var i = 0; i < value; i++) {
        const element = document.createElement('div');
        element.setAttribute('id', `node_${i}`);
        element.setAttribute('class', 'sorting_element')
        element.style.height = `${Math.floor(20 + (Math.random() * 500))}px`;
        // element.style.height = `${heights[i]}px`;
        sortingBox.appendChild(element);
    }
}

async function sort() {
    switch (sortingType) {
        case 'bubble':
            return bubbleSort();
        case 'selection':
            return selectionSort();
        case 'insertion':
            return insertionSort();
    }
}

async function bubbleSort() {
    const domNodes = document.querySelectorAll('.sorting_element');

    for(let i=0; i<domNodes.length; i++) {
        let swap = false;
        for(let j=0; j < domNodes.length - 1 - i; j++) {
            let currNodeHeight = parseInt(domNodes[j].style.height);
            let nextNodeHeight = parseInt(domNodes[j + 1].style.height);
            domNodes[j].style.backgroundColor = '#3d5a80';
            domNodes[j+1].style.backgroundColor = '#293241';
            await delay(interval);
            if (currNodeHeight > nextNodeHeight) {
                await swapNodes(domNodes, j, j + 1);
                swap = true;
            }
            await delay(interval);
            domNodes[j].style.backgroundColor = '#ee6c4d';
            domNodes[j+1].style.backgroundColor = '#ee6c4d';
        }
        if (!swap) {
            break;
        }
    }
}

async function selectionSort() {
    const domNodes = document.querySelectorAll('.sorting_element');
    for(let i=0; i<domNodes.length; i++) {
        let minInd = i;
        for(let j=i + 1; j < domNodes.length; j++) {
            domNodes[i].style.backgroundColor = '#3d5a80';
            domNodes[j].style.backgroundColor = '#293241';
            await delay(interval);

            let currNodeHeight = parseInt(domNodes[minInd].style.height);
            let nextNodeHeight = parseInt(domNodes[j].style.height);

            if (currNodeHeight > nextNodeHeight) {
                minInd = j;
            }
            domNodes[j].style.backgroundColor = '#ee6c4d';
        }
        if (minInd === i) {
            domNodes[i].style.backgroundColor = '#ee6c4d';
            domNodes[minInd].style.backgroundColor = '#ee6c4d';
            continue;
        }
        await swapNodes(domNodes, i, minInd);
        domNodes[i].style.backgroundColor = '#ee6c4d';
        domNodes[minInd].style.backgroundColor = '#ee6c4d';
    }
}

async function insertionSort() {
    const domNodes = document.querySelectorAll('.sorting_element');

    for (var i = 1; i < domNodes.length; i++) {
        let j = i;
        let currNode = domNodes[j];
        let prevNode = domNodes[j - 1];
        currNode.style.backgroundColor = '#3d5a80';
        prevNode.style.backgroundColor = '#293241';
        let currNodeHeight = parseInt(currNode.style.height);
        let prevNodeHeight = parseInt(prevNode.style.height);
        while(j > 0 && currNodeHeight < prevNodeHeight) {
            await delay(interval);
            await swapNodes(domNodes, j, j - 1);
            currNode.style.backgroundColor = '#ee6c4d';
            prevNode.style.backgroundColor = '#ee6c4d';
            j--;
            if (j > 0) {
                currNode = domNodes[j];
                prevNode = domNodes[j - 1];
                currNodeHeight = parseInt(currNode.style.height);
                prevNodeHeight = parseInt(prevNode.style.height);
                currNode.style.backgroundColor = '#3d5a80';
                prevNode.style.backgroundColor = '#293241';
            }
        }
        await delay(interval);
        currNode.style.backgroundColor = '#ee6c4d';
        prevNode.style.backgroundColor = '#ee6c4d';
    }
}

async function swapNodes(domNodes, i, j) {
    domNodes[i].style.opacity = 0;
    domNodes[j].style.opacity = 0;
    await delay(0.01);
    // domNodes[i].setAttribute('style', `height:${arr[j]}px`);
    let h1 = domNodes[i].style.height;
    let h2 = domNodes[j].style.height;
    // domNodes[j].setAttribute('style', `height:${arr[i]}px`);
    domNodes[i].style.height = h2;
    domNodes[j].style.height = h1;
    domNodes[i].style.opacity = 1;
    domNodes[j].style.opacity = 1;
}

function delay(n) {
    return new Promise(res => {
        setTimeout(() => res(), n * 1000);
    })
}