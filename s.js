// The selector will match all input controls of type :checkbox
// and attach a click event handler
$("input:checkbox").on('click', function() {
    // In the handler, 'this' refers to the box clicked on
    var $box = $(this);
    if ($box.is(":checked")) {
        // The name of the box is retrieved using the .attr() method
        // as it is assumed and expected to be immutable
        var group = "input:checkbox[name='" + $box.attr("name") + "']";
        // The checked state of the group/box on the other hand will change
        // and the current value is retrieved using .prop() method
        $(group).prop("checked", false);
        $box.prop("checked", true);
    } else {
        $box.prop("checked", false);
    }
});
function slowScrollTo(container, targetPosition, duration) {
    const startPosition = container.scrollLeft;
    const distance = targetPosition - startPosition;
    let startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = ease(timeElapsed, startPosition, distance, duration);
        container.scrollLeft = run;

        if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
}

document.getElementById('scroll-right-btn').addEventListener('click', function() {
    var container = document.getElementById('scroll-container');
    var targetPosition = container.scrollWidth; // Rightmost end
    slowScrollTo(container, targetPosition, 1000); // 1000ms (1 second)
});

document.getElementById('scroll-left-btn').addEventListener('click', function() {
    var container = document.getElementById('scroll-container');
    var targetPosition = 0; // Leftmost end
    slowScrollTo(container, targetPosition, 1000); // 1000ms (1 second)
});

document.getElementById('scroll-container').addEventListener('scroll', function() {
    var container = document.getElementById('scroll-container');
    var scrollLeftBtn = document.getElementById('scroll-left-btn');
    var scrollRightBtn = document.getElementById('scroll-right-btn');

    // Show/hide the left button based on scroll position
    if (container.scrollLeft > 0) {
        scrollLeftBtn.style.display = 'block';
    } else {
        scrollLeftBtn.style.display = 'none';
    }

    // Show/hide the right button based on scroll position
    if (container.scrollLeft + container.clientWidth >= container.scrollWidth) {
        scrollRightBtn.style.display = 'none';
    } else {
        scrollRightBtn.style.display = 'block';
    }
});
