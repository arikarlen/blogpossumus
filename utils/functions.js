import { toast } from "sonner";

export const CopyToClipboard = (toCopy, message = "Link copiado al portapapeles") => {
  const el = document.createElement(`textarea`);
  el.value = toCopy;
  el.setAttribute(`readonly`, ``);
  el.style.position = `absolute`;
  el.style.left = `-9999px`;
  document.body.appendChild(el);
  el.select();
  document.execCommand(`copy`);
  document.body.removeChild(el);
  console;
  toast.success(message);
};

export const TrimText = (text, maxLength)=>{
  return text.slice(0, maxLength) + '...'
}