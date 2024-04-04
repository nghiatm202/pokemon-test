import { Directive, DirectiveBinding } from "vue";

export const rippleEffect: Directive = {
    mounted(el: HTMLElement, binding: DirectiveBinding) {
        el.addEventListener('click', function (event: MouseEvent) {
            const customClasses = binding.arg || 'ripple';
            const duration = binding.value?.duration || 500;

            const span = document.createElement('span');
            span.className = 'ripple';
        
            // Position the ripple effect
            const diameter = Math.max(el.clientWidth, el.clientHeight);
            const radius = diameter / 2;
            const offsetX = event.clientX - el.getBoundingClientRect().left - radius;
            const offsetY = event.clientY - el.getBoundingClientRect().top - radius;
        
            // Add custom styling from binding options if provided
            if (binding.value) {
                if (binding.value.backgroundColor)
                    span.style.backgroundColor = binding.value.backgroundColor;
                // Add other potential styling options here
            }

            span.style.display = 'block';
            span.style.position = 'absolute';
            span.style.width = span.style.height = `${diameter}px`;
            span.style.left = `${offsetX}px`;
            span.style.top = `${offsetY}px`;
            span.classList.add(customClasses);

            el.appendChild(span);

            setTimeout(() => span.remove(), duration);
        });
    }
}