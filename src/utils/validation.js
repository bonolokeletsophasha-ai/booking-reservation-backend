// Checks whether a value is a non-empty string.
export const isNonEmptyString = (value) => {
return typeof value === "string" && value.trim().length > 0;
};

// Checks whether an email address has a basic valid format.
export const isValidEmail = (email) => {
if (typeof email !== "string") {
return false;
}

return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
};

// Checks whether a date follows the YYYY-MM-DD format
// and represents a real calendar date.
export const isValidDate = (date) => {
if (typeof date !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
return false;
}

const parsedDate = new Date(`${date}T00:00:00Z`);

return (
!Number.isNaN(parsedDate.getTime()) &&
parsedDate.toISOString().slice(0, 10) === date
);
};