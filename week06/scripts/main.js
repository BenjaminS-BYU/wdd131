const currentYear = new Date().getFullYear();
document.getElementById("copyright").innerHTML = `&copy; ${currentYear} | Benjamin Strong | Canada`;
document.getElementById("lastModified").innerHTML = `Last Modified: ${document.lastModified}`;

const btn = document.getElementById("menu")
const nav = document.querySelector(".main-nav")

btn.addEventListener("click", () => {
    nav.classList.toggle("show");
    btn.textContent = btn.textContent === "≡" ? "X" : "≡";
});


const products = [
  { id: 'p1', title: 'Mechanical Keyboard', desc: 'Compact 75% layout RGB', price: 129.99, img: 'https://ca.hyperx.com/cdn/shop/files/hyperx_alloy_origins_60_us_5_top_down_special_renamed_11.jpg?v=1763555868' },
  { id: 'p2', title: 'USB-C Dock', desc: '6-in-1 docking station', price: 79.99, img: 'https://www.belkin.com/dw/image/v2/BGBH_PRD/on/demandware.static/-/Sites-master-product-catalog-blk/default/dwcfc4ff49/images/hi-res/5/5bc27f7eaacd053f_Belkin-USB-C%2011-in-1-Multiport-Adapter-INC004btSGY-6000x6000_Web.jpg?sfrm=png' },
  { id: 'p3', title: 'Wireless Mouse', desc: 'Ergonomic rechargeable', price: 49.99, img: 'https://c1.neweggimages.com/productimage/nb640/ASSAD2204050CU6TR5A.jpg' }
];

// utils
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => Array.from(document.querySelectorAll(sel));

// localStorage keys
const CART_KEY = 'techup_cart';

// load/save cart
function loadCart(){
  const raw = localStorage.getItem(CART_KEY);
  return raw ? JSON.parse(raw) : [];
}
function saveCart(cart){
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartCount();
}

// render products to product list
function renderProducts(list){
  const container = $('#productList');
  container.innerHTML = `${list.map(p => `
    <div class="product" data-id="${p.id}">
      <img src="${p.img}" alt="${p.title}" loading="lazy">
      <div class="product-info">
        <h4>${p.title}</h4>
        <p>${p.desc}</p>
        <div class="price">$${p.price.toFixed(2)}</div>
        <div style="margin-top:.5rem">
          <button class="btn add-to-cart" data-id="${p.id}">Add to cart</button>
        </div>
      </div>
    </div>
  `).join('')}`;
}


function addToCart(id){
  const product = products.find(p => p.id === id);
  if(!product) return;
  const cart = loadCart();
  const found = cart.find(i => i.id === id);
  if(found){ // increase qty
    found.qty += 1;
  } else {
    cart.push({ id: product.id, title: product.title, price: product.price, qty: 1 });
  }
  saveCart(cart);
  displayCart();
}

// display cart panel
function displayCart(){
  const cart = loadCart();
  const contents = $('#cartContents');
  if(cart.length === 0){
    contents.innerHTML = `<p>Your cart is empty.</p>`;
    $('#cartTotal').textContent = `Total: $0.00`;
    return;
  }
  contents.innerHTML = `${cart.map(item => `
    <div class="cart-item" data-id="${item.id}">
      <strong>${item.title}</strong> — ${item.qty} × $${item.price.toFixed(2)}
      <button class="btn remove-item" data-id="${item.id}" style="margin-left:.5rem;">Remove</button>
    </div>
  `).join('')}`;

  const total = cart.reduce((sum, it) => sum + it.qty * it.price, 0);
  $('#cartTotal').textContent = `Total: $${total.toFixed(2)}`;
}

// remove item from cart
function removeFromCart(id){
  let cart = loadCart();
  cart = cart.filter(i => i.id !== id);
  saveCart(cart);
  displayCart();
}

// clear cart
function clearCart(){
  saveCart([]);
  displayCart();
}

// update cart count in header
function updateCartCount(){
  const cart = loadCart();
  const count = cart.reduce((acc, it) => acc + it.qty, 0);
  $$('#cartCount').forEach(span => span.textContent = count);
}

// contact form validation and save (localStorage)
function validateContactForm(formData){
  const errors = [];
  if(!formData.name.trim()) errors.push('Name is required.');
  if(!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email)) errors.push('Valid email is required.');
  if(!formData.message.trim()) errors.push('Message is required.');
  return errors;
}
function saveContact(data){
  const key = 'techup_contacts';
  const raw = localStorage.getItem(key);
  const arr = raw ? JSON.parse(raw) : [];
  arr.push({ ...data, submittedAt: new Date().toISOString() });
  localStorage.setItem(key, JSON.stringify(arr));
}

// UI wiring
document.addEventListener('DOMContentLoaded', () => {
  // render initial products
  renderProducts(products);
  updateCartCount();

  // product add buttons (event delegation)
  document.body.addEventListener('click', (e) => {
    const addBtn = e.target.closest('.add-to-cart');
    if(addBtn){
      const id = addBtn.dataset.id;
      addToCart(id);
      return;
    }
    const removeBtn = e.target.closest('.remove-item');
    if(removeBtn){
      const id = removeBtn.dataset.id;
      removeFromCart(id);
      return;
    }
    if(e.target.id === 'clearCartBtn'){
      clearCart();
      return;
    }
    if(e.target.id === 'checkoutBtn'){
      // simple checkout simulation
      const cart = loadCart();
      if(cart.length === 0){
        alert('Your cart is empty.');
        return;
      }
      // In real site, proceed to payment. Here we clear cart and show confirmation.
      saveCart([]);
      alert('Checkout complete — thank you for your purchase.');
      displayCart();
      return;
    }
    // cart toggle
    if(e.target.id === 'cartToggle'){
      toggleCartPanel();
    }
  });

  // cart toggle: also close when clicking outside
  document.addEventListener('click', (e) => {
    const panel = $('#cartPanel');
    const toggle = $('#cartToggle');
    if(!panel || !toggle) return;
    const isClickOnToggle = e.target.closest('#cartToggle');
    const isInsidePanel = e.target.closest('#cartPanel');
    if(isClickOnToggle){
      // handled above
      return;
    }
    if(panel.classList.contains('hidden')) return;
    if(!isInsidePanel && !isClickOnToggle){
      hideCartPanel();
    }
  });

  // contact form submit (if present)
  const contactForm = $('#contactForm');
  if(contactForm){
    contactForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      const data = {
        name: $('#name').value || '',
        email: $('#email').value || '',
        message: $('#message').value || ''
      };
      const msgs = validateContactForm(data);
      const msgEl = $('#formMsg');
      if(msgs.length){
        msgEl.textContent = msgs.join(' ');
        msgEl.style.color = 'crimson';
        return;
      }
      saveContact(data);
      msgEl.textContent = 'Message sent. We will contact you soon.';
      msgEl.style.color = 'green';
      contactForm.reset();
    });
  }

  // display cart if panel exists
  if($('#cartPanel')){
    displayCart();
    hideCartPanel(); // start hidden
  }
});

// cart panel helpers
function toggleCartPanel(){
  const panel = $('#cartPanel');
  if(!panel) return;
  const expanded = panel.classList.contains('hidden') === false;
  if(expanded) hideCartPanel();
  else showCartPanel();
}
function showCartPanel(){
  const panel = $('#cartPanel');
  if(!panel) return;
  panel.classList.remove('hidden');
  panel.setAttribute('aria-hidden', 'false');
  $('#cartToggle').setAttribute('aria-expanded', 'true');
  displayCart();
}
function hideCartPanel(){
  const panel = $('#cartPanel');
  if(!panel) return;
  panel.classList.add('hidden');
  panel.setAttribute('aria-hidden', 'true');
  $('#cartToggle').setAttribute('aria-expanded', 'false');
}
