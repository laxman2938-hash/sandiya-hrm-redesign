-- CreateTable for CandidateSubmission
CREATE TABLE "candidate_submissions" (
    "id" SERIAL NOT NULL PRIMARY KEY,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "areaOfInterest" TEXT NOT NULL,
    "passportUrl" TEXT NOT NULL,
    "experienceCertificateUrl" TEXT,
    "additionalDocuments" TEXT,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);
