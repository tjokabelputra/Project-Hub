export const formatStatus = (status) => {
  return status
    .toLowerCase()
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

export const formatDate = (date) => {
  if (!date) return '-';

  return new Date(`${date}T00:00:00`).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
};

export const formatFileSize = (size) => {
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  let count = 0;

  while (size >= 1000 && count < units.length - 1) {
    size /= 1000;
    count += 1;
  }

  return `${Number(size.toFixed(2))} ${units[count]}`;
};

export const areInputsValid = (inputs = []) => {
  return inputs.every((input) => {
    if (typeof input === 'string') {
      return input.trim() !== '';
    }

    return input !== null && input !== undefined && input !== '';
  });
};

export function formatUpdatedMessage(update) {
  return [
    `${update.name} – ${formatDate(update.date)}`,
    `• Progress: ${update.progress || '-'}`,
    `• Issue: ${update.issue || 'Tidak ada kendala'}`,
    `• Next Action: ${update.nextStep || '-'}`,
    `• PIC: ${update.pic}`,
    `• Target: ${update.deadline ? formatDate(update.deadline) : '-'}`,
  ].join('\n');
}

export function formatDateTime(dateTime) {
  if (!dateTime) return '-';

  return new Date(dateTime).toLocaleString('id-ID', {
    timeZone: 'Asia/Jakarta',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23'
  }).replace(/\./g, ':').replace(',', ',');
}