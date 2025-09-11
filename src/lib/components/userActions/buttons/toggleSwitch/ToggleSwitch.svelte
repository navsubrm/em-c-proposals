<script lang="ts">
    import { setSliceTheme } from "$lib/configs/sliceTheme";
    // Props
    let { theme, id, label, checked = $bindable(false), disabled = false, onChange = undefined } = $props();

    let themeBase = $state(setSliceTheme(theme));
    
    // Handle change
    function handleChange(e: Event) {
      const target = e.target as HTMLInputElement;
      checked = target.checked;
      
      if (onChange) {
        onChange(checked);
      }
    }
  </script>
  
  <div class="toggle-container" style="--_background: var({themeBase.bg}); --_text-color: var({themeBase.text}); --_anchor-color: var({themeBase.anchor})">
    <label for={id} class="toggle-label">
      {label}
    </label>
    
    <label class="switch">
      <input 
        type="checkbox" 
        id={id} 
        bind:checked={checked} 
        {disabled}
        onchange={handleChange}
      />
      <span class="slider"></span>
      <span class="toggle-text">{checked ? 'Yes' : 'No'}</span>
    </label>
  </div>
  
  <style>
    .toggle-container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 0.5em;
    }
    
    .toggle-label {
      font-weight: normal;
      margin-bottom: 0;
      flex: 1;
    }
    
    .switch {
      position: relative;
      display: inline-flex;
      align-items: center;
      width: 60px;
      height: 24px;
    }
    
    .switch input {
      opacity: 0;
      width: 0;
      height: 0;
    }
    
    .slider {
      position: absolute;
      cursor: pointer;
      top: 0;
      left: 0;
      right: 30px;
      bottom: 0;
      background-color: var(--_background, var(--theme-text-light));
      transition: .4s;
      border-radius: 24px;
    }
    
    .slider:before {
      position: absolute;
      content: "";
      height: 16px;
      width: 16px;
      left: 4px;
      bottom: 4px;
      background-color: var(--_background, var(--theme-text-light));
      transition: .4s;
      border-radius: 50%;
    }
    
    input:checked + .slider {
      background-color: var(--_text-color, var(--theme-bg-dark));
    }
    
    input:focus + .slider {
      box-shadow: 0 0 1px var(--_text-color, var(--theme-bg-dark));
    }
    
    input:checked + .slider:before {
      transform: translateX(16px);
    }
    
    input:disabled + .slider {
      opacity: 0.5;
      cursor: not-allowed;
    }
    
    .toggle-text {
      margin-left: 35px;
      font-size: 0.8em;
      color: var(--_text-color, var(--theme-bg-dark));;
      font-weight: bold;
    }
  </style>
  