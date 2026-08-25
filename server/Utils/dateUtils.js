function getISTDate(dateInput) {
    const utcMs = new Date(dateInput ?? Date.now()).getTime();
    const istMs = utcMs + 5.5 * 60 * 60 * 1000;
    const d = new Date(istMs);
    return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, '0')}-${String(d.getUTCDate()).padStart(2, '0')}`;
}

function getTodayIST() {
    return getISTDate(Date.now());
}

function getNDaysAgoIST(n) {
    return getISTDate(Date.now() - n * 24 * 60 * 60 * 1000);
}

function getISTMidnightUTC() {
    const IST_OFFSET_MS = 5.5 * 60 * 60 * 1000;
    const nowIST = Date.now() + IST_OFFSET_MS;
    const istMidnightMs = Math.floor(nowIST / 86400000) * 86400000;
    return new Date(istMidnightMs - IST_OFFSET_MS);
}

module.exports = { getISTDate, getTodayIST, getNDaysAgoIST, getISTMidnightUTC };
