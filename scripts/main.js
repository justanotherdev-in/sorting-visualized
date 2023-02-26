const sortingBox = document.querySelector('#sorting_box');

addNodes(50);

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

async function bubbleSort() {
    const domNodes = document.querySelectorAll('.sorting_element');
    const arr = [];
    domNodes.forEach(node => arr.push({ id: node.id, val: parseInt(node.style.height) }));
    // console.log(arr);

    for(let i=0; i<arr.length; i++) {
        let swap = false;
        for(let j=0; j<arr.length - 1 - i; j++) {
            const h1 = arr[j].val;
            domNodes[j].style.backgroundColor = '#3d5a80';
            domNodes[j+1].style.backgroundColor = '#293241';
            await delay(0.1);
            if (h1 > arr[j+1].val) {
                domNodes[j].hidden = true;
                domNodes[j+1].hidden = true;
                await delay(0.01);
                domNodes[j].setAttribute('style', `height:${arr[j+1].val}px`);
                domNodes[j+1].setAttribute('style', `height:${h1}px`);
                domNodes[j].hidden = false;
                domNodes[j+1].hidden = false;
                arr[j].val = arr[j + 1].val;
                arr[j+1].val = h1;
                swap = true;
            }
            await delay(0.1);
            domNodes[j].style.backgroundColor = '#ee6c4d';
            domNodes[j+1].style.backgroundColor = '#ee6c4d';
        }
        if (!swap) {
            break;
        }
    }
    // console.log(arr);
}

function delay(n) {
    return new Promise(res => {
        setTimeout(() => res(), n * 1000);
    })
}