let sortingType = 'bubble';
const sortingBox = document.querySelector('#sorting_box');

addNodes(50);

function setSortingType(type) {
    sortingType = type;
}

function addNodes(value) {
    sortingBox.innerHTML = '';
    document.querySelector('button').hidden = false;
    for (var i = 0; i < value; i++) {
        const element = document.createElement('div');
        element.setAttribute('id', `node_${i}`);
        element.setAttribute('class', 'sorting_element')
        element.style.height = `${Math.floor(20 + (Math.random() * 500))}px`;
        sortingBox.appendChild(element);
    }
}

async function sort() {
    switch (sortingType) {
        case 'bubble':
            return bubbleSort();
        case 'selection':
            return selectionSort();
    }
}

async function bubbleSort() {
    const domNodes = document.querySelectorAll('.sorting_element');
    const arr = [];
    domNodes.forEach(node => arr.push({ id: node.id, val: parseInt(node.style.height) }));
    // console.log(arr);

    for(let i=0; i<arr.length; i++) {
        let swap = false;
        for(let j=0; j<arr.length - 1 - i; j++) {
            domNodes[j].style.backgroundColor = '#3d5a80';
            domNodes[j+1].style.backgroundColor = '#293241';
            await delay(0.1);
            if (arr[j].val > arr[j+1].val) {
                await swapNodes(domNodes, arr, j, j + 1);
                swap = true;
            }
            domNodes[j].style.backgroundColor = '#ee6c4d';
            domNodes[j+1].style.backgroundColor = '#ee6c4d';
        }
        if (!swap) {
            break;
        }
    }
    // console.log(arr);
}

async function selectionSort() {
    const domNodes = document.querySelectorAll('.sorting_element');
    const arr = [];
    domNodes.forEach(node => arr.push({ id: node.id, val: parseInt(node.style.height) }));
    // console.log(arr);
    for(let i=0; i<arr.length; i++) {
        let minInd = i;
        for(let j=i + 1; j < arr.length; j++) {
            domNodes[i].style.backgroundColor = '#3d5a80';
            domNodes[j].style.backgroundColor = '#293241';
            await delay(0.1);
            if (arr[minInd].val > arr[j].val) {
                minInd = j;
            }
            domNodes[j].style.backgroundColor = '#ee6c4d';
        }
        if (minInd === i) {
            domNodes[i].style.backgroundColor = '#ee6c4d';
            domNodes[minInd].style.backgroundColor = '#ee6c4d';
            continue;
        }
        await swapNodes(domNodes, arr, i, minInd);
        domNodes[i].style.backgroundColor = '#ee6c4d';
        domNodes[minInd].style.backgroundColor = '#ee6c4d';
    }
}

async function swapNodes(domNodes, arr, i, j) {
    domNodes[j].style.backgroundColor = '#293241';
    domNodes[i].hidden = true;
    domNodes[j].hidden = true;
    await delay(0.01);
    domNodes[i].setAttribute('style', `height:${arr[j].val}px`);
    domNodes[j].setAttribute('style', `height:${arr[i].val}px`);
    domNodes[i].hidden = false;
    domNodes[j].hidden = false;
    const temp = arr[j].val;
    arr[j].val = arr[i].val;
    arr[i].val = temp;
    await delay(0.1);
}

function delay(n) {
    return new Promise(res => {
        setTimeout(() => res(), n * 1000);
    })
}