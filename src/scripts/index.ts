import { setupProfessors } from './professors';
import { setupReviews } from './reviews';

export function setupSite() {
    setupProfessors();
    setupReviews();
}