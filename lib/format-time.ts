export function formatTime(seconds: number) {
  const days = Math.floor(seconds / (60 * 60 * 24));
  const hours = Math.floor((seconds % (60 * 60 * 24)) / (60 * 60));
  const minutes = Math.floor((seconds % (60 * 60)) / 60);
  const remainingSeconds = (seconds % 60).toFixed(2);

  let formattedTime = "";

  if (seconds === 0) {
    return (formattedTime += 'Not played');
  }
  if (days > 0) {
    formattedTime += `${days} day${days > 1 ? "s" : ""} `;
  }

  if (hours > 0) {
    formattedTime += `${hours} hour${hours > 1 ? "s" : ""} `;
  }

  if (minutes > 0 || (hours === 0 && days === 0)) {
    formattedTime += `${minutes} min${minutes > 1 ? "s" : ""} `;
  }

  formattedTime += `${remainingSeconds} second${
    parseFloat(remainingSeconds) > 1 ? "s" : ""
  }`;

  return formattedTime.trim();
}

export function formatDate(date: string): string {
  const formattedDate = new Date(date);
  const day = String(formattedDate.getDate()).padStart(2, '0');
  const month = String(formattedDate.getMonth() + 1).padStart(2, '0');
  const year = String(formattedDate.getFullYear());
  
  return `${day}/${month}/${year}`;
}
